package com.cooksys.ftd.drivestorageorange.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
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
	 * Upload a new file
	 * 
	 * @return uid of newly uploaded file
	 */
	@PostMapping("")
	public FolderDTO uploadFolders(InputStream inputStream, @RequestParam("folderName") String folderName) {
		System.out.println(folderName);
		FolderDTO uploadedFolder = this.folderService.uploadFolders(folderName, inputStream);

		if (uploadedFolder != null) {
			return uploadedFolder;
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
	 * download a folder's data
	 * 
	 * @param uid      of folder to download
	 * @param response for interaction with client
	 * @see HttpServletResponse
	 */
	@GetMapping("{uid}/download")
	public void downloadFolder(@PathVariable("uid") Long uid, HttpServletResponse response) {
		List<FileEntity> serveFiles = this.folderService.getFilesInFolder(uid);
		System.out.println("\n");
		response.setContentType("application/pdf");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + this.folderService.getFolder(uid).getName() + ".zip" + "\"");
		
		// FINISH IMPLEMENTING ZIP
		try {
			OutputStream outStr = response.getOutputStream();
			ZipOutputStream outZip = new ZipOutputStream(outStr);
			
			for(FileEntity serveFile : serveFiles) {
				ZipEntry zipFile = new ZipEntry(serveFile.getName());
				outZip.putNextEntry(zipFile);
				outZip.write(serveFile.getData());
			}
			
			outZip.close();
			response.flushBuffer();
		} catch (IOException ex) {
			System.out.println("Error writing file to output stream.");
			throw new RuntimeException("IOError writing file to output stream");
		}
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
	@PatchMapping("{uid}/move")
	public FolderDTO moveFolderToRoot(@PathVariable("uid") Long uid) {
		return this.folderService.moveFolder(uid);
	}

	/**
	 * Moves a folder into a folder via UID
	 * 
	 * @param folderUid of folder being moved
	 * @param folderUid of destination being moved to
	 */
	@PatchMapping("{folderUid}/move/{containerUid}")
	public FolderDTO moveFolder(@PathVariable("folderUid") Long folderUid, @PathVariable("containerUid") Long containerUid) {
		return this.folderService.moveFolder(folderUid, containerUid);
	}

}
