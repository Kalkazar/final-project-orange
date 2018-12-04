package com.cooksys.ftd.drivestorageorange.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.services.FolderService;

@RestController
@RequestMapping("folder")
public class FolderController {
	
	private FolderService folderService;
	
	@Autowired
	public FolderController(FolderService folderService) {
		super();
		this.folderService = folderService;
	}
	
	@GetMapping("")
	public List<FolderDTO> getAllFolders() {
		return this.folderService.getAllFolders();
	}
	
//	@POST /folder/{folder_name}/upload
	//Upload a folder
//	@PostMapping("{folder_name}/upload")
//	public void uploadFolder() {
//		//
//	}
	
	
//	@POST /folder/{folder_name}
//		Create an empty folder
//		Returns id
	@PostMapping("{folder_name}")
	public Long createFolder(@PathVariable("folder_name") String folderName) {
		return this.folderService.createFolder(folderName);
	}
	
	
//	@PATCH /folder/{folder_uid}/rename/{new_name}
	@PatchMapping("{folder_uid}/rename/{new_name}")
	public String renameFolder(@PathVariable("folder_uid") Long id, @PathVariable("new_name") String folderName) {
		return this.folderService.renameFolder(id, folderName);
	}
	
	
//	@DELETE /folder/{folder_uid}/
//		Moves a given folder to the trash
	@DeleteMapping("{folder_uid}")
	public Long deleteFolder(@PathVariable("folder_uid") Long id) {
		return this.folderService.deleteFolder(id);
	}
	
	
//	@POST /get-folders/
//		Params:
//			(optional) sort_by: foldername (default), uid,
//			(optional) page (default 1, 1-based indexing)
//			(optional) limit: 1-100 (default 100)
//		Returns a list of all current folders names and ids
	@PostMapping("get-folders")
	public void getFolders() {
		//
	}

}
