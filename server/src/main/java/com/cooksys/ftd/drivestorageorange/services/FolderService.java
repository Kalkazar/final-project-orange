package com.cooksys.ftd.drivestorageorange.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
import com.cooksys.ftd.drivestorageorange.mappers.FileMapper;
import com.cooksys.ftd.drivestorageorange.mappers.FolderMapper;
import com.cooksys.ftd.drivestorageorange.repositories.FileRepository;
import com.cooksys.ftd.drivestorageorange.repositories.FolderRepository;

@Service
public class FolderService {
	
	@Autowired
	FileRepository fileRepository;
	
	@Autowired
	FolderRepository folderRepository;

	@Autowired
	FolderMapper folderMapper;
	
	// John additions
	@Autowired
	FileMapper fileMapper;
	
	/**
	 * Create a new empty folder
	 * 
	 * @param name
	 * @return FolderDTO
	 * @see FolderDTO
	 */
	public FolderDTO createFolder(String name) {
		FolderEntity folder = new FolderEntity();
		folder.setName(name);
		
		return getFolderWithContents(toDto(saveFolder(folder)));
	}

	/**
	 * Uploads a file and returns DTO of newly uploaded file
	 * @param inputStream file data uploaded as a zip
	 * @return List<FileDTO>
	 * @see List<FileDTO>
	 * @see InputStream
	 */
	public FolderDTO uploadFolders(String folderName, InputStream inputStream) {
		FolderEntity newFolder = new FolderEntity();
		newFolder.setName(folderName);
		saveFolder(newFolder);
		newFolder = this.folderRepository.getByName(folderName).get(0);
		
		try (ZipInputStream zipInputStream = new ZipInputStream(inputStream);) {
			ZipEntry entry;
			byte[] buffer = new byte[2048];
			while((entry = zipInputStream.getNextEntry()) != null) {
				FileEntity fileToUpload = new FileEntity();
				ByteArrayOutputStream output = null;

				fileToUpload.setName(entry.getName());
				fileToUpload.setContainer(newFolder);
				
				try {
					output = new ByteArrayOutputStream();
					int len = 0;
					
					while((len = zipInputStream.read(buffer)) > 0) {
						output.write(buffer, 0, len);
					}
				}
				finally {
					fileToUpload.setData(output.toByteArray());
					
					if(output != null) {
						output.close();
					}
				}
				this.fileRepository.save(fileToUpload);
			}
			
			return toDto(newFolder);
		} catch(IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Returns a folder without data by uid
	 * 
	 * @param uid to search for
	 * @return FolderDTO
	 * @see FolderDTO
	 */
	public FolderDTO getFolderByUID(Long uid) {
		return toDto(getFolder(uid));
	}
	
	/**
	 * Returns a list of all stored folders
	 * 
	 * @return List<FolderDTO>
	 * @see FolderDTO
	 */
	public List<FolderDTO> getAllFolders() {
		// Default implementation
//		return this.folderMapper.toDto(this.folderRepository.findAll());
		
		// John implementation
		List<FolderEntity> folderEntities = this.folderRepository.findAll();
		List<FolderDTO> folderDTOs = new ArrayList<>();
		
		for (FolderEntity entity : folderEntities) {
			FolderDTO folderToAdd = this.folderMapper.toDto(entity);
			folderToAdd.setFilesContained(this.fileMapper.toDto(this.fileRepository.getAllInContainer(entity.getUid())));
			folderDTOs.add(folderToAdd);
		}
		
		return folderDTOs;
	}
	
	/**
	 * Populates a folder's contained files
	 * @param folder
	 * @return FolderDTO
	 */
	private FolderDTO getFolderWithContents(FolderDTO folder) {
		folder.setFilesContained(this.fileMapper.toDto(this.fileRepository.getAllInContainer(folder.getUid())));
		return folder;
	}
	
	/**
	 * Populates a list of folders with their contained files
	 * @param folder
	 * @return FolderDTO
	 */
	private List<FolderDTO> getFolderWithContents(List<FolderDTO> folders) {
		List<FolderDTO> populatedFolders = new ArrayList<>();
		
		for (FolderDTO folder : folders) {
			populatedFolders.add(this.getFolderWithContents(folder));
		}
		return populatedFolders;
	}

	/**
	 * Renames a folder by UID
	 * 
	 * @param uid     of folder to rename
	 * @param newName to assign to folder
	 */
	public FolderDTO renameFolder(Long uid, String newName) {
		FolderEntity editingFolder = getFolder(uid);
		editingFolder.setName(newName);
		
		return toDto(saveFolder(editingFolder));
	}

	/**
	 * Stages a folder and its files for deletion "in trash" by UID
	 * 
	 * @param uid of folder to put "in trash"
	 */
	public FolderDTO trashFolder(Long uid) {
		FolderEntity editingFolder = getFolder(uid);
		List<FileEntity> filesInFolder = getFilesInFolder(uid);

		editingFolder.setInTrash(true);
		for(FileEntity file : filesInFolder) {
			file.setInTrash(true);
			this.fileRepository.save(file);
		}
		return toDto(saveFolder(editingFolder));
	}

	/**
	 * Moves folder into root directory by UID
	 * 
	 * @param folderUid of folder to move
	 */
	public FolderDTO moveFolder(Long uid) {
		FolderEntity editingFolder = getFolder(uid);
		editingFolder.setContainer(null);
		return toDto(saveFolder(editingFolder));
	}

	/**
	 * Moves folder into specified directory by UID
	 * 
	 * @param folderUid    of folder to move
	 * @param containerUid of destination to move file to
	 */
	public FolderDTO moveFolder(Long folderUid, Long containerUid) {
		FolderEntity editingFolder = getFolder(folderUid);
		editingFolder.setContainer(getFolder(containerUid));
		return toDto(saveFolder(editingFolder));
	}
	
	// Utility methods
	
	/**
	 * Get a FolderEntity by UID
	 * 
	 * @param folderUid
	 * @return FolderEntity
	 */
	public FolderEntity getFolder(Long folderUid) {
		return this.folderRepository.getOne(folderUid);
	}
	
	
	/**
	 * Returns a list of files in the folder with uid
	 * 
	 * @param uid
	 * @return List<FileEntity>
	 */
	public List<FileEntity> getFilesInFolder(Long uid) {
		return this.fileRepository.getAllInContainer(uid);
	}
	
	/**
	 * Save FolderEntity to database
	 * 
	 * @param folderEntity
	 * @return FolderEntity
	 */
	private FolderEntity saveFolder(FolderEntity folderEntity) {
		return this.folderRepository.save(folderEntity);
	}
	
	/**
	 * Map FolderEntity to FolderDTO
	 * 
	 * @param folderEntity
	 * @return FolderDTO
	 */
	private FolderDTO toDto(FolderEntity folderEntity) {
		return getFolderWithContents(this.folderMapper.toDto(folderEntity));
	}

	
}
