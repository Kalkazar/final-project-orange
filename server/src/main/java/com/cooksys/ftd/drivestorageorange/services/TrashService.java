package com.cooksys.ftd.drivestorageorange.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
import com.cooksys.ftd.drivestorageorange.repositories.FileRepository;
import com.cooksys.ftd.drivestorageorange.repositories.FolderRepository;

@Service
public class TrashService {

	@Autowired
	FileRepository fileRepository;
	@Autowired
	FolderRepository folderRepository;

	/**
	 * Permanently deletes file by UID File must be inTrash to do so
	 * 
	 * @param uid to permanently delete
	 */
	public void deleteFile(Long uid) {
		FileEntity deleteTarget = this.fileRepository.getOneTrashed(uid);

		if (deleteTarget != null) {
			this.fileRepository.delete(deleteTarget);
		} else {
			System.out.println("No matching target for deletion!");
		}
	}

	/**
	 * Permanently deletes folder by UID Folder must be inTrash to do so
	 * 
	 * @param uid to permanently delete
	 */
	public void deleteFolder(Long uid) {
		FolderEntity deleteTarget = this.folderRepository.getOneTrashed(uid);

		if (deleteTarget != null) {
			this.folderRepository.delete(deleteTarget);
		} else {
			System.out.println("No matching target for deletion!");
		}
	}

	/**
	 * Restores file by UID File must be inTrash to do so
	 * 
	 * @param uid to restore
	 */
	public void restoreFile(Long uid) {
		FileEntity restoreTarget = this.fileRepository.getOneTrashed(uid);

		if (restoreTarget != null) {
			this.fileRepository.save(restoreTarget);
		} else {
			System.out.println("No matching target for restoration!");
		}
	}

	/**
	 * Restores folder by UID Folder must be inTrash to do so
	 * 
	 * @param uid to restore
	 */
	public void restoreFolder(Long uid) {
		FolderEntity restoreTarget = this.folderRepository.getOneTrashed(uid);

		if (restoreTarget != null) {
			this.folderRepository.save(restoreTarget);
		} else {
			System.out.println("No matching target for restoration!");
		}
	}

	/**
	 * Delete all by files and folders in trash
	 */
	public void deleteAll() {
		List<FileEntity> deleteTrashedFiles = this.fileRepository.getAllTrashed();
		List<FolderEntity> deleteTrashedFolders = this.folderRepository.getAllTrashed();

		if (deleteTrashedFiles != null || deleteTrashedFolders != null) {
			this.fileRepository.deleteAll(deleteTrashedFiles);
			this.folderRepository.deleteAll(deleteTrashedFolders);
		} else {
			System.out.println("No targets for deletion!");
		}
	}

	/**
	 * Restores all by files and folders in trash
	 */
	public void restoreAll() {
		List<FileEntity> restoreTrashedFiles = this.fileRepository.getAllTrashed();
		List<FolderEntity> restoreTrashedFolders = this.folderRepository.getAllTrashed();

		if (restoreTrashedFiles != null || restoreTrashedFolders != null) {
			this.fileRepository.saveAll(restoreTrashedFiles);
			this.folderRepository.saveAll(restoreTrashedFolders);
		} else {
			System.out.println("No targets for restoration!");
		}
	}

}
