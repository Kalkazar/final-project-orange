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
	 */
	@DeleteMapping("/file/{file_uid}/delete")
	public void deleteFile(@PathVariable("file_uid") Long uid) {
		this.trashService.deleteFile(uid);
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
	public void restoreFile(@PathVariable("file_uid") Long uid) {
		this.trashService.restoreFile(uid);
	}

	/**
	 * Permanently deletes a folder by uid
	 * 
	 * @param uid of the fold to permanently delete
	 */
	@DeleteMapping("folder/{folder_uid}/delete")
	public void deleteFolder(@PathVariable("folder_uid") Long uid) {
		this.trashService.deleteFolder(uid);
	}

	/**
	 * Restores a folder by uid
	 * 
	 * @param uid of the fold to restore
	 */
	@PatchMapping("folder/{folder_uid}/restore")
	public void restoreFolder(@PathVariable("folder_uid") Long uid) {
		this.trashService.restoreFolder(uid);
	}

	/**
	 * Permanently deletes all files and folders in trash
	 */
	@DeleteMapping("delete")
	public void deleteAll() {
		this.trashService.deleteAll();
	}

	/**
	 * Restores all files and folders in trash
	 */
	@PatchMapping("restore")
	public void restoreAll() {
		this.trashService.restoreAll();
	}

}
