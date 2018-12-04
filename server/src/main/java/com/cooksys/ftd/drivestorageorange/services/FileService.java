package com.cooksys.ftd.drivestorageorange.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.repositories.FileRepository;

@Service
public class FileService {

	@Autowired
	FileRepository fileRepository;

	/**
	 * Uploads a file and returns it's UID <- Clean this up
	 * @param uploadFile File to upload
	 * @return Long
	 */
	public Long uploadFile(FileEntity uploadFile) {
		return this.fileRepository.save(uploadFile).getUid();
	}
	
	
	public Long uploadFile(MultipartFile uploadFile) {
		FileEntity newFile = new FileEntity();
		
		newFile.setName("test.txt");
		
		try {
			newFile.setData(uploadFile.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			newFile = null;
		}
		
		if(newFile != null) {
			return this.fileRepository.save(newFile).getUid();
		} else {
			return new Long(-1);
		}
	}

	/**
	 * Returns a file by UID
	 * @param uid to search for
	 * @return FileEntity
	 */
	public FileEntity getFileByUID(Long uid) {
		return this.fileRepository.getOne(uid);
	}

	/**
	 * Renames a file by UID
	 * @param uid of file to rename
	 * @param newName to assign to file
	 */
	public void renameFile(Long uid, String newName) {
		FileEntity editingFile = this.getFileByUID(uid);
		
		editingFile.setName(newName);
		
		this.fileRepository.save(editingFile);
	}

	/**
	 * [NOT FULLY IMPLEMENTED]
	 * Stages a file for deletion "in trash" by UID
	 * @param uid of file to put "in trash"
	 */
	public void trashFile(Long uid) {
		FileEntity editingFile = this.getFileByUID(uid);
		
		editingFile.setInTrash(true);
		
		this.fileRepository.save(editingFile);
		
	}

	/**
	 * [NOT FULLY IMPLEMENTED]
	 * Moves file into root directory by UID
	 * @param fileUid of file to move
	 */
	public void moveFile(Long fileUid) {
		FileEntity editingFile = this.getFileByUID(fileUid);
		
		// Requires FolderEntity implementation
		editingFile.setContainer(null);
		this.fileRepository.save(editingFile);
	}

	/**
	 * [NOT IMPLEMENTED]
	 * Moves file into specified directory by UID
	 * @param fileUid of file to move
	 * @param folderUid of destination to move file to
	 */
	public void moveFile(Long fileUid, Long folderUid) {
		FileEntity editingFile = this.getFileByUID(fileUid);
		
		// Requires FolderEntity implementation
	}

	/**
	 * [NOT IMPLEMENTED]
	 * Returns all stored files via pagination
	 * @param sortBy Method to sort files
	 * @param page Page of sorted files to return
	 * @param limit Number of files to return
	 */
	public void getFiles(String sortBy, Long page, Long limit) {
//		this.fileRepository.findAll(sort)
	}

	/**
	 * Permanently deletes file by UID
	 * File must be inTrash to do so
	 * @param uid to permanently delete
	 */
	public void deleteFile(Long uid) {
		FileEntity deleteTarget = this.fileRepository.getOneTrashed(uid);
		
		if(deleteTarget != null) {
			this.fileRepository.delete(deleteTarget);
		} else {
			System.out.println("No matching target for deletion!");
		}
	}

	

}
