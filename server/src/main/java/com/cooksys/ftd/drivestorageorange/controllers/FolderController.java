package com.cooksys.ftd.drivestorageorange.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("folder")
public class FolderController {
	
//	/folder
//	@POST /folder/{folder_name}/upload
//	Upload a folder
	
	@PostMapping("")
	public void uploadFolder() {
		
	}
	
	
//	@POST /folder/{folder_name}
//		Create an empty folder
//		Returns id
	
	@PostMapping("{uid}")
	public void createFolder() {
		
	}
	
	
//	@PATCH /folder/{folder_uid}/rename
	@PatchMapping("{uid}/rename")
	public void renameFolder() {
		
	}
	
	
//	@DELETE /folder/{folder_uid}/
//		Moves a given folder to the trash
	
	@DeleteMapping("{uid}")
	public void deleteFolder() {
		
	}
	
	
//	@POST /get-folders/
//		Params:
//			(optional) sort_by: foldername (default), uid,
//			(optional) page (default 1, 1-based indexing)
//	(optional) limit: 1-100 (default 100)
//		Returns a list of all current folders names and ids
	
	@PostMapping("get")
	public void getFolders() {
		
	}
	
	


}
