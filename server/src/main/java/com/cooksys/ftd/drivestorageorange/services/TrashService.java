package com.cooksys.ftd.drivestorageorange.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.ftd.drivestorageorange.dtos.FileDTO;
import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
import com.cooksys.ftd.drivestorageorange.mappers.FileMapper;
import com.cooksys.ftd.drivestorageorange.mappers.FolderMapper;
import com.cooksys.ftd.drivestorageorange.repositories.FileRepository;
import com.cooksys.ftd.drivestorageorange.repositories.FolderRepository;

@Service
public class TrashService {

	@Autowired
	FileRepository fileRepository;
	@Autowired
	FolderRepository folderRepository;
	@Autowired
	FileMapper fileMapper;
	@Autowired
	FolderMapper folderMapper;

	/**
	 * Permanently deletes file by UID File must be inTrash to do so
	 * 
	 * @param uid to permanently delete
	 * @return dto of deleted file
	 */
	public FileDTO deleteFile(Long uid) {
		FileEntity deleteTarget = this.fileRepository.getOneTrashed(uid);
		FileDTO deleted = null;

		if (deleteTarget != null) {
			deleted = this.fileMapper.toDto(deleteTarget);
			this.fileRepository.delete(deleteTarget);
		} else {
			System.out.println("No matching target for deletion!");
		}
		
		return deleted;
	}

	/**
	 * Permanently deletes folder by UID Folder must be inTrash to do so
	 * 
	 * @param uid to permanently delete
	 * @return dto of deleted folder
	 */
	public FolderDTO deleteFolder(Long uid) {
		FolderEntity deleteTarget = this.folderRepository.getOneTrashed(uid);
		List<FileEntity> deleteContained = this.fileRepository.getAllInContainer(uid);
		FolderDTO deleted = null;

		if (deleteTarget != null) {
			if(deleteTarget.isInTrash() == true && deleteContained != null) {
				for(FileEntity file: deleteContained) {
					this.fileRepository.delete(file);
				}
			}
			deleted = this.folderMapper.toDto(deleteTarget);
			this.folderRepository.delete(deleteTarget);
		} else {
			System.out.println("No matching target for deletion!");
		}
		return deleted;
	}

	/**
	 * Restores file by UID File must be inTrash to do so
	 * 
	 * @param uid to restore
	 * @return restored file dto
	 */
	public FileDTO restoreFile(Long uid) {
		FileEntity restoreTarget = this.fileRepository.getOneTrashed(uid);

		if (restoreTarget != null) {
			restoreTarget.setInTrash(false);
			restoreTarget.setContainer(null);
		}
		return this.fileMapper.toDto(this.fileRepository.save(restoreTarget));
	}

	/**
	 * Restores folder by UID Folder must be inTrash to do so
	 * 
	 * @param uid to restore
	 * return restored folder dto
	 */
	public FolderDTO restoreFolder(Long uid) {
		FolderEntity restoreTarget = this.folderRepository.getOneTrashed(uid);
		List<FileEntity> restoreContained = this.fileRepository.getAllInContainer(uid);
		if (restoreTarget != null) {
			restoreTarget.setInTrash(false);
			if(restoreTarget.isInTrash() == false && restoreContained != null) {
				for(FileEntity file: restoreContained) {
					this.restoreFile(file.getUid());
				}
			}
		}
		return this.folderMapper.toDto(this.folderRepository.save(restoreTarget));
	}

	/**
	 * Delete all by files and folders in trash
	 */
	public void deleteAll() {
		List<FileEntity> deleteTrashedFiles = this.fileRepository.getAllTrashed();
		List<FolderEntity> deleteTrashedFolders = this.folderRepository.getAllTrashed();

		if (deleteTrashedFiles != null) {
			this.fileRepository.deleteAll(deleteTrashedFiles);
		} else {
			System.out.println("No files for deletion!");
		}
		
		if (deleteTrashedFolders != null) {
			this.folderRepository.deleteAll(deleteTrashedFolders);
		} else {
			System.out.println("No folders for deletion!");
		}
	}

	/**
	 * Restores all by files and folders in trash
	 */
	public void restoreAll() {
		List<FileEntity> restoreTrashedFiles = this.fileRepository.getAllTrashed();
		List<FolderEntity> restoreTrashedFolders = this.folderRepository.getAllTrashed();

		if (restoreTrashedFiles != null) {
			for (FileEntity file : restoreTrashedFiles) {
				this.restoreFile(file.getUid());
			}
		} else {
			System.out.println("No files for restoration!");
		}

		if (restoreTrashedFolders != null) {
			for (FolderEntity folder : restoreTrashedFolders) {
				this.restoreFolder(folder.getUid());
			}
		} else {
			System.out.println("No folders for restoration!");
		}
	}

	/**
	 * Retrieves all files in trash
	 * 
	 * @return list of file dtos in trash
	 */
	public List<FileDTO> getTrashedFiles() {
		List<FileEntity> trashedFiles = this.fileRepository.getAllTrashed();
		return fileMapper.toDto(trashedFiles);
	}

	/**
	 * Retrieves all folders in trash
	 * 
	 * @return list of folder dtos in trash
	 */
	public List<FolderDTO> getTrashedFolders() {
		List<FolderEntity> trashedFolders = this.folderRepository.getAllTrashed();
		return folderMapper.toDto(trashedFolders);
	}

}
