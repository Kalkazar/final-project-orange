package com.cooksys.ftd.drivestorageorange.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.ftd.drivestorageorange.services.FileService;
import com.cooksys.ftd.drivestorageorange.services.FolderService;

@RestController
@RequestMapping("trash")
public class TrashController {
	
	@Autowired
	FileService fileService;
	
	// Pending implementation
//	@Autowired
//	FolderService folderService;

//	/trash
//	@DELETE /file/
//		Removes a file permanently

	@DeleteMapping("file/{uid}")
	public void deleteFile(@PathVariable("uid") Long uid) {
		this.fileService.deleteFile(uid);
	}
	
	// Consider restore/dump all endpoints for both files and folders?

//	@DELETE /folder/
//		Removes a folder permanently

	// Pending implementation
//	@DeleteMapping("folder/{uid}")
//	public void deleteFolder(@PathVariable("uid") Long uid) {
//		this.folderService.permanentlyDeleteFolder(uid);
//	}

}
