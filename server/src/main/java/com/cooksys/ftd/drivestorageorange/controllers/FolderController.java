package com.cooksys.ftd.drivestorageorange.controllers;

//import java.io.IOException;
//import java.io.OutputStream;
import java.util.List;
import java.util.Map;

//import javax.servlet.http.HttpServletResponse;

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
//import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
//import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
import com.cooksys.ftd.drivestorageorange.services.FolderService;

@RestController
@RequestMapping("folder")
public class FolderController {
	
	@Autowired
	FolderService folderService;
	
	
	/**
	 * Create a new empty folder
	 * 
	 * @param name
	 * @return FolderDTO of newly created folder
	 */
	@PostMapping("create/{name}")
	public FolderDTO createFolder(@PathVariable("name") String name) {
		return this.folderService.createFolder(name);
	}
	
	/**
	 * Upload a new folder
	 * 
	 * @return FolderDTO of newly uploaded folder
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
	 * Used to download a folder's data
	 * 
	 * @param uid      of folder to download
	 * @param response for interaction with client
	 * @see HttpServletResponse
	 */
//	@GetMapping("{uid}/download")
//	public void downloadFile(@PathVariable("uid") Long uid, HttpServletResponse response) {
//		FolderEntity serveFolder = this.folderService.getFolder(uid);
//
//		response.setContentType("application/pdf");
//		response.setHeader("Content-Disposition", "attachment; foldername=\"" + serveFolder.getName() + "\"");
//
//		try {
//			OutputStream outStr = response.getOutputStream();
//			outStr.write(serveFile.getData());
//			response.flushBuffer();
//		} catch (IOException ex) {
//			System.out.println("Error writing file to output stream.");
//			throw new RuntimeException("IOError writing file to output stream");
//		}
//	}
	
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
	public FolderDTO renameFolder(@PathVariable("uid") Long uid, @PathVariable("newName") String newName) {
		return this.folderService.renameFolder(uid, newName);
	}
	
	/**
	 * Moves a folder to the trash via UID
	 * 
	 * @param uid of folder to move to trash
	 */
	@DeleteMapping("{uid}")
	public FolderDTO trashFolder(@PathVariable("uid") Long uid) {
		return this.folderService.trashFolder(uid);
	}
	
	/**
	 * Moves a folder to the root folder
	 * 
	 * @param folderUid of folder being moved
	 */
	@PatchMapping("move/{uid}")
	public FolderDTO moveFolderToRoot(@PathVariable("uid") Long uid) {
		return this.folderService.moveFolder(uid);
	}

	/**
	 * Moves a folder into a folder via UID
	 * 
	 * @param folderUid of folder being moved
	 * @param folderUid of destination being moved to
	 */
	@PatchMapping("move/{folderUid}/{containerUid}")
	public FolderDTO folderService(@PathVariable("folderUid") Long folderUid, @PathVariable("containerUid") Long containerUid) {
		return this.folderService.moveFolder(folderUid, containerUid);
	}

}
