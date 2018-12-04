package com.cooksys.ftd.drivestorageorange.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.ftd.drivestorageorange.dtos.GetFilesDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.services.FileService;

@RestController
@RequestMapping("file")
public class FileController {

	@Autowired
	FileService fileService;

	/**
	 * Upload a new file
	 * 
	 * @return uid of newly uploaded file
	 */
//	@PostMapping("")
//	public Map<String, Long> uploadFile(@RequestBody FileEntity uploadFile) {
//		HashMap<String, Long> uploadUid = new HashMap<>();
//
//		uploadUid.put("uid", this.fileService.uploadFile(uploadFile));
//		
//		return uploadUid;
//	}
	
	@PostMapping("")
	public Map<String, Long> uploadFile(@RequestParam("file") MultipartFile uploadFile) {
		HashMap<String, Long> uploadUid = new HashMap<>();

		uploadUid.put("uid", this.fileService.uploadFile(uploadFile));
		
//		this.fileService.uploadFile(uploadFile);
		
		return uploadUid;
	}


	/**
	 * Returns a file via UID, if it exists
	 * 
	 * @return FileEntity
	 * @throws IOException 
	 */
	@GetMapping("{uid}")
	public FileEntity getFile(@PathVariable("uid") Long uid) throws IOException {
//		FileEntity test = new FileEntity();
//		File data = new File("example.txt");
//		
//
//		test.setUid(new Long(23000));
//		test.setName("testFile.txt");
//		test.setCreated(new Date(new Long(12345)));
//		test.setLastModified(new Date(new Long(12345)));
//		test.setData(Files.readAllBytes(data.toPath()));
//
//		return test;

		return this.fileService.getFileByUID(uid);
	}

//	@PATCH /file/{file_uid}/rename
//		Renames the given file

	@PatchMapping("{uid}/rename/{newName}")
	public void renameFile(@PathVariable("uid") Long uid, @PathVariable("newName") String newName) {
		this.fileService.renameFile(uid, newName);
	}

//	@DELETE /file/{file_uid}/
//		Moves a given file to the trash

	@DeleteMapping("{uid}")
	public void trashFile(@PathVariable("uid") Long uid) {
		this.fileService.trashFile(uid);
	}

//	@PATCH /move-file/{file_uid}
//	Moves a file to the root folder

	@PatchMapping("move/{fileUid}")
	public void moveFileToRoot(@PathVariable("fileUid") Long fileUid) {
		this.fileService.moveFile(fileUid);
	}

//	@PATCH /move-file/{file_uid}/{folder_uid}
//		Moves a file to the given folder.

	@PatchMapping("move/{fileUid}/{folderUid}")
	public void moveFile(@PathVariable("fileUid") Long fileUid, @PathVariable("folderUid") Long folderUid) {
		this.fileService.moveFile(fileUid, folderUid);
	}

//	@POST /get-files/
//		Params:
//			(optional) sort_by: filename (default), uid
//	(optional) page (default 1, 1-based indexing) 
//	(optional) limit: 1-100 (default 100)
//		Returns a list of up current file names and ids

	@PostMapping("get-files")
	public void getFiles(@RequestBody GetFilesDTO options) {
		this.fileService.getFiles(options.getSortBy(), options.getPage(), options.getLimit());
	}

}
