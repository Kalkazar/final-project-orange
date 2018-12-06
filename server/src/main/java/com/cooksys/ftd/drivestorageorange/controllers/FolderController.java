package com.cooksys.ftd.drivestorageorange.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.services.FolderService;

@RestController
@RequestMapping("folder")
public class FolderController {
	
	@Autowired
	FolderService folderService;
	
	/**
	 * Upload a new folder
	 * 
	 * @return uid of newly uploaded folder
	 */
	@PostMapping("")
	public FolderDTO uploadFolder(@RequestParam("name") String name, @RequestParam("file") Map<String, MultipartFile> uploadFolder) {
		FolderDTO newUpload = this.folderService.uploadFolder(name, uploadFolder);

		if (newUpload != null) {
			return newUpload;
		}
		return null;
	}
	
	/**
	 * Returns a folder via UID, if it exists
	 * 
	 * @return FolderDTO
	 * @see FolderDTO
	 */
	@GetMapping("{uid}")
	public FolderDTO getFolder(@PathVariable("uid") Long uid) {
		return this.folderService.getFolderByUID(uid);
	}
	
	/**
	 * Returns all folders
	 * 
	 * @return all FolderDTOs
	 */
	@GetMapping("")
	public List<FolderDTO> getAllFolders() {
		return this.folderService.getAllFolders();
	}

	/**
	 * Renames a folder by UID
	 * 
	 * @param uid     of folder to rename
	 * @param newName to be assigned to folder
	 */
	@PatchMapping("{uid}/rename/{newName}")
	public void renameFile(@PathVariable("uid") Long uid, @PathVariable("newName") String newName) {
		this.folderService.renameFolder(uid, newName);
	}
	
	/**
	 * Moves a folder to the trash via UID
	 * 
	 * @param uid of folder to move to trash
	 */
	@DeleteMapping("{uid}")
	public void trashFolder(@PathVariable("uid") Long uid) {
		this.folderService.trashFolder(uid);
	}
	
	/**
	 * Moves a folder to the root folder
	 * 
	 * @param folderUid of folder being moved
	 */
	@PatchMapping("move/{uid}")
	public void moveFolderToRoot(@PathVariable("uid") Long uid) {
		this.folderService.moveFolder(uid);
	}

	/**
	 * Moves a folder into a folder via UID
	 * 
	 * @param folderUid of folder being moved
	 * @param folderUid of destination being moved to
	 */
	@PatchMapping("move/{folderUid}/{containerUid}")
	public void folderService(@PathVariable("folderUid") Long folderUid, @PathVariable("containerUid") Long containerUid) {
		this.folderService.moveFolder(folderUid, containerUid);
	}

}
