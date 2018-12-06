package com.cooksys.ftd.drivestorageorange.services;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
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
	public FolderDTO uploadFolder(String name, Map<String, MultipartFile> uploadFolder) {
		FolderEntity uploadedFolder = new FolderEntity();
		uploadedFolder.setName(name);

		try {
			for(String fileName : uploadFolder.keySet()) {
				FileEntity uploadedFile = new FileEntity();
				uploadedFile.setData(uploadFolder.get(fileName).getBytes());
				
				if(uploadedFile.getData() != null) {
					this.fileRepository.save(uploadedFile);
				}
			}
			
			return toDto(saveFolder(uploadedFolder));
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
	
	/**
	 * Returns a folder by UID
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
		return this.folderMapper.toDto(this.folderRepository.findAll());
	}

	/**
	 * Renames a folder by UID
	 * 
	 * @param uid     of folder to rename
	 * @param newName to assign to folder
	 */
	public void renameFolder(Long uid, String newName) {
		FolderEntity editingFolder = getFolder(uid);
		editingFolder.setName(newName);
		saveFolder(editingFolder);
	}

	/**
	 * Stages a folder for deletion "in trash" by UID
	 * 
	 * @param uid of folder to put "in trash"
	 */
	public void trashFolder(Long uid) {
		FolderEntity editingFolder = getFolder(uid);
		editingFolder.setInTrash(true);
		saveFolder(editingFolder);
	}

	/**
	 * Moves folder into root directory by UID
	 * 
	 * @param folderUid of folder to move
	 */
	public void moveFolder(Long uid) {
		FolderEntity editingFolder = getFolder(uid);
		editingFolder.setContainer(null);
		saveFolder(editingFolder);
	}

	/**
	 * Moves folder into specified directory by UID
	 * 
	 * @param folderUid    of folder to move
	 * @param containerUid of destination to move file to
	 */
	public void moveFolder(Long folderUid, Long containerUid) {
		FolderEntity editingFolder = getFolder(folderUid);
		editingFolder.setContainer(getFolder(containerUid));
		saveFolder(editingFolder);
	}
	
	// Utility methods
	private FolderEntity getFolder(Long folderUid) {
		return this.folderRepository.getOne(folderUid);
	}
	
	private FolderDTO toDto(FolderEntity folderEntity) {
		return this.folderMapper.toDto(folderEntity);
	}
	
	private FolderEntity saveFolder(FolderEntity folderEntity) {
		return this.folderRepository.save(folderEntity);
	}
}
