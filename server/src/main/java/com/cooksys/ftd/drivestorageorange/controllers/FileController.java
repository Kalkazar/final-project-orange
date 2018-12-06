package com.cooksys.ftd.drivestorageorange.controllers;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

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

import com.cooksys.ftd.drivestorageorange.dtos.FileDTO;
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
	@PostMapping("")
	public FileDTO uploadFile(@RequestParam("name") String name, @RequestParam("file") MultipartFile uploadFile) {
		FileDTO newUpload = this.fileService.uploadFile(name, uploadFile);

		if (newUpload != null) {
			return newUpload;
		}
		return null;
	}

	/**
	 * Returns a file via UID, if it exists
	 * 
	 * @return FileDTO
	 * @param uid of the file to get
	 * @see FileDTO
	 */
	@GetMapping("{uid}")
	public FileDTO getFile(@PathVariable("uid") Long uid) {
		return this.fileService.getFileByUID(uid);
	}

	/**
	 * Used to download a file's data
	 * 
	 * @param uid      of file to download
	 * @param response for interaction with client
	 * @see HttpServletResponse
	 */
	@GetMapping("{uid}/download")
	public void downloadFile(@PathVariable("uid") Long uid, HttpServletResponse response) {
		FileEntity serveFile = this.fileService.getFileEntity(uid);

		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + serveFile.getName() + "\"");

		try {
			OutputStream outStr = response.getOutputStream();
			outStr.write(serveFile.getData());
			response.flushBuffer();
		} catch (IOException ex) {
			System.out.println("Error writing file to output stream.");
			throw new RuntimeException("IOError writing file to output stream");
		}
	}

	/**
	 * Returns all files
	 * 
	 * @return all FileDTOs
	 */
	@GetMapping("")
	public List<FileDTO> getAllFiles() {
		return this.fileService.getAllFiles();
	}

	/**
	 * Renames a file by UID
	 * 
	 * @return FileDTO
	 * @param uid     of file to rename
	 * @param newName to be assigned to file
	 */
	@PatchMapping("{uid}/rename/{newName}")
	public FileDTO renameFile(@PathVariable("uid") Long uid, @PathVariable("newName") String newName) {
		return this.fileService.renameFile(uid, newName);
	}

	/**
	 * Moves a file to the trash via UID
	 * 
	 * @return FileDTO
	 * @param uid of file to move to trash
	 */
	@DeleteMapping("{uid}")
	public FileDTO trashFile(@PathVariable("uid") Long uid) {
		return this.fileService.trashFile(uid);
	}

	/**
	 * Moves a file to the root folder
	 * 
	 * @return FileDTO
	 * @param fileUid
	 */
	@PatchMapping("{uid}/move")
	public FileDTO moveFileToRoot(@PathVariable("uid") Long uid) {
		return this.fileService.moveFile(uid);
	}

	/**
	 * Moves a file into a folder via UID
	 * 
	 * @return FileDTO
	 * @param fileUid   of file being moved
	 * @param folderUid of destination being moved to
	 */
	@PatchMapping("{fileUid}/move/{folderUid}")
	public FileDTO moveFile(@PathVariable("fileUid") Long fileUid, @PathVariable("folderUid") Long folderUid) {
		return this.fileService.moveFile(fileUid, folderUid);
	}

}
