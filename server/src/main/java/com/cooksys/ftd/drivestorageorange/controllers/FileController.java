package com.cooksys.ftd.drivestorageorange.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("file")
public class FileController {
	
//	@GetMapping("")
//	public List<Hashtag> getAllTags() {
//		return this.hashtagRepository.findAll();
//	}
//
//	@GetMapping("{label}")
//	public Hashtag getHashtagByLabel(@PathVariable("label") String label) {
//		return this.hashtagRepository.findByLabelCaseLess(label);
//	}
	
	
//	/file
//	@POST /file/
//	Upload a file
//	Returns uid
	
	@PostMapping("")
	public String uploadFile() {
		return "";
	}
	
//	@GET /file/{file_uid}
//		Returns a file
	
	@GetMapping("{uid}")
	public void getFile() {
		
	}
	
//	@PATCH /file/{file_uid}/rename
//		Renames the given file
	
//	@PatchMapping("{uid}/rename")
//	public void renameFile() {
//		
//	}
	
//	@DELETE /file/{file_uid}/
//		Moves a given file to the trash
	
	@DeleteMapping("{uid}")
	public void deleteFile() {
		
	}
	
	
//	@PATCH /move-file/{file_uid}/{folder_uid}
//		Moves a file to the given folder. Moves 
//		to root if {folder_uid} is not provided
	
	@PatchMapping("/move/{file_uid}/{folder_uid}")
	public void moveFile() {
		
	}
	
	
//	@PATCH /move-file/{file_uid} // Pointless??!?!
//		Moves a file to the root folder
	
	
//	@POST /get-files/
//		Params:
//			(optional) sort_by: filename (default), uid
//	(optional) page (default 1, 1-based indexing) 
//	(optional) limit: 1-100 (default 100)
//		Returns a list of up current file names and ids
	
	@PostMapping("get")
	public void getFiles() {
		
	}


}
