package com.cooksys.ftd.drivestorageorange.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.ftd.drivestorageorange.services.FileService;
import com.cooksys.ftd.drivestorageorange.services.FolderService;
import com.cooksys.ftd.drivestorageorange.services.TrashService;

@RestController
@RequestMapping("trash")
public class TrashController {

	@Autowired
	FileService fileService;
	@Autowired
	FolderService folderService;
	@Autowired
	TrashService trashService;

//	@DELETE /file/{file_uid}/delete
//		Removes a file permanently
	@DeleteMapping("/file/{file_uid}/delete")
	public void deleteFile(@PathVariable("uid") Long uid) {
		this.trashService.deleteFile(uid);
	}

//	@DELETE /file/{file_uid}/restore
//		Restores a file
	@PatchMapping("file/{file_uid}/restore")
	public void restoreFile(@PathVariable("file_uid") Long uid) {
		this.trashService.restoreFile(uid);
	}

//	@DELETE /folder/{folder_uid}/delete
//		Removes a folder permanently
	@DeleteMapping("folder/{folder_uid}/delete")
	public void deleteFolder(@PathVariable("uid") Long uid) {
		this.trashService.deleteFolder(uid);
	}

//	@DELETE /file/{folder_uid}/restore
//	Restores a folder
	@PatchMapping("folder/{folder_uid}/restore")
	public void restoreFolder(@PathVariable("folder_uid") Long uid) {
		this.trashService.restoreFolder(uid);
	}

}
