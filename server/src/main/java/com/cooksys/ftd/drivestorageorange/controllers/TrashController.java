package com.cooksys.ftd.drivestorageorange.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	@CrossOrigin
	@DeleteMapping("/file/{file_uid}/delete")
	public void deleteFile(@PathVariable("uid") Long uid) {
		this.trashService.deleteFile(uid);
	}

//	@Patch /file/{file_uid}/restore
//		Restores a file
	@CrossOrigin
	@PatchMapping("file/{file_uid}/restore")
	public void restoreFile(@PathVariable("file_uid") Long uid) {
		this.trashService.restoreFile(uid);
	}

//	@DELETE /folder/{folder_uid}/delete
//		Removes a folder permanently
	@CrossOrigin
	@DeleteMapping("folder/{folder_uid}/delete")
	public void deleteFolder(@PathVariable("uid") Long uid) {
		this.trashService.deleteFolder(uid);
	}

//	@Patch /file/{folder_uid}/restore
//		Restores a folder
	@CrossOrigin
	@PatchMapping("folder/{folder_uid}/restore")
	public void restoreFolder(@PathVariable("folder_uid") Long uid) {
		this.trashService.restoreFolder(uid);
	}

//	@DELETE /file/{folder_uid}/restore
//		Restores a folder
	@CrossOrigin
	@PatchMapping("delete")
	public void deleteAll() {
		this.trashService.deleteAll();
	}

//	@Patch /file/{folder_uid}/restore
//		Restores all files and folders in trash
	@CrossOrigin
	@PatchMapping("restore")
	public void restoreAll() {
		this.trashService.restoreAll();
	}

}
