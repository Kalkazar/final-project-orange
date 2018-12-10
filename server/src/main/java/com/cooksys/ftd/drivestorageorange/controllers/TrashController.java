package com.cooksys.ftd.drivestorageorange.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.ftd.drivestorageorange.dtos.FileDTO;
import com.cooksys.ftd.drivestorageorange.dtos.FilesAndFoldersDTO;
import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.services.FileService;
import com.cooksys.ftd.drivestorageorange.services.FolderService;
import com.cooksys.ftd.drivestorageorange.services.TrashService;

@CrossOrigin
@RestController
@RequestMapping("trash")
public class TrashController {

	@Autowired
	FileService fileService;
	@Autowired
	FolderService folderService;
	@Autowired
	TrashService trashService;

	/**
	 * Permanently deletes a file by uid
	 * 
	 * @param uid of the file to permanently delete
	 * @return dto of deleted file
	 */
	@DeleteMapping("/file/{file_uid}/delete")
	public FileDTO deleteFile(@PathVariable("file_uid") Long uid) {
		return this.trashService.deleteFile(uid);
	}

	/**
	 * Retrieves all folders in trash
	 * 
	 * @return List of file dtos
	 */
	@GetMapping("/file")
	public List<FileDTO> getTrashedFiles() {
		return this.trashService.getTrashedFiles();
	}

	/**
	 * Retrieves all folders in trash
	 * 
	 * @return List of folder dtos
	 */
	@GetMapping("/folder")
	public List<FolderDTO> getTrashedFolders() {
		return this.trashService.getTrashedFolders();
	}

	/**
	 * Restores a file by uid
	 * 
	 * @param uid of the file to restore
	 */
	@PatchMapping("file/{file_uid}/restore")
	public FileDTO restoreFile(@PathVariable("file_uid") Long uid) {
		return this.trashService.restoreFile(uid);
	}

	/**
	 * Permanently deletes a folder by uid
	 * 
	 * @param uid of the fold to permanently delete
	 * @return dto of deleted folder
	 */
	@DeleteMapping("folder/{folder_uid}/delete")
	public FolderDTO deleteFolder(@PathVariable("folder_uid") Long uid) {
		return this.trashService.deleteFolder(uid);
	}

	/**
	 * Restores a folder by uid
	 * 
	 * @param uid of the fold to restore
	 */
	@PatchMapping("folder/{folder_uid}/restore")
	public FolderDTO restoreFolder(@PathVariable("folder_uid") Long uid) {
		return this.trashService.restoreFolder(uid);
	}

	/**
	 * Permanently deletes all files and folders in trash
	 * 
	 * @return a dto containing a list of both file and folder dtos that have been permanently deleted
	 */
	@DeleteMapping("delete")
	public FilesAndFoldersDTO deleteAll() {
		return this.trashService.deleteAll();
	}

	/**
	 * Restores all files and folders in trash
	 * 
	 * @return a dto containing a list of both file and folder dtos that have been restored
	 */
	@PatchMapping("restore")
	public FilesAndFoldersDTO restoreAll() {
		return this.trashService.restoreAll();
	}

}
