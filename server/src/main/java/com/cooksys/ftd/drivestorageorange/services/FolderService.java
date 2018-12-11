package com.cooksys.ftd.drivestorageorange.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
		FolderEntity uploadedFolder = new FolderEntity();
		uploadedFolder.setName(name);
		
		return toDto(saveFolder(uploadedFolder));
	}

	/**
	 * [NOT FULLY IMPLEMENTED] Uploads a folder and all files contained within,
	 * and returns DTO of newly uploaded folder
	 * @param name to assign uploaded folder
	 * @param uploadFolder folder data uploaded
	 * @return FolderDTO
	 * @see FolderDTO
	 * @see MultipartFile
	 */
	public FolderDTO uploadFolder(MultipartFile uploadFolder) {
		try(ZipInputStream zipInputStream = new ZipInputStream(uploadFolder.getInputStream());){
//			File convFile = null;
//			ZipFile zip = null;

			System.out.println("\n");

			FolderEntity container = null;
			ZipEntry entry;
			while((entry = zipInputStream.getNextEntry()) != null) {
				String[] path = entry.getName().split("/");
				String entryName = path[path.length - 1];
				
				if(entry.isDirectory()) {
					System.out.println("Creating folder:");
					System.out.println(entryName);
					
					createFolder(entryName);
					
					if(container == null) {
						container = this.folderRepository.getByName(entryName).get(0);
					}
//					if(convFile == null) {
//						convFile = new File(entry.getName() + ".zip");
//					    uploadFolder.transferTo(convFile);
//					    zip = new ZipFile(convFile);
//					}
				} else {
					System.out.println("Uploading File:");
					System.out.println(entryName);
					FileEntity file = new FileEntity();

					file.setName(entryName);
					if(container != null) {
						file.setContainer(container);
					}
					ByteArrayOutputStream buffer = new ByteArrayOutputStream();
					byte[] data = new byte[(int) entry.getSize()];
					int nRead;

//					HALP PLS FIX
//					while ((nRead = entry.read(data, 0, data.length)) != -1) {
//					  buffer.write(data, 0, nRead);
//					}
//
//					return buffer.toByteArray();
					
					return null;
					
//					if(zip != null) {
//						ZipEntry entryZip = zip.getEntry(entry.getName());
//						InputStream inputStream = zip.getInputStream(entryZip);
//						byte[] bytes = new byte[(int) entryZip.getSize()];
//						DataInputStream dis = new DataInputStream(inputStream);
//						dis.readFully(bytes);
//						file.setData(bytes);
//					}
					
//					this.fileRepository.save(file);
				}
			}
			
			return toDto(container);
		} catch (IOException e) {
			e.printStackTrace();
		}
//		System.out.println(folderZip);
//		FolderEntity uploadedFolder = new FolderEntity();
//		uploadedFolder.setName(name);
//
//		try {
//			for(String fileName : uploadFolder.keySet()) {
//				FileEntity uploadedFile = new FileEntity();
//				uploadedFile.setData(uploadFolder.get(fileName).getBytes());
//				
//				if(uploadedFile.getData() != null) {
//					this.fileRepository.save(uploadedFile);
//				}
//			}
//			
//			return toDto(saveFolder(uploadedFolder));
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

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
		return this.folderMapper.toDto(folderEntity);
	}
}
