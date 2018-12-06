package com.cooksys.ftd.drivestorageorange.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cooksys.ftd.drivestorageorange.dtos.FileDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.mappers.FileMapper;
import com.cooksys.ftd.drivestorageorange.repositories.FileRepository;
import com.cooksys.ftd.drivestorageorange.repositories.FolderRepository;

@Service
public class FileService {

	@Autowired
	FileRepository fileRepository;
	
	@Autowired
	FolderRepository folderRepository;

	@Autowired
	FileMapper fileMapper;

	/**
	 * Uploads a file and returns DTO of newly uploaded file
	 * @param name to assign uploaded file
	 * @param uploadFile file data uploaded
	 * @return FileDTO
	 * @see FileDTO
	 * @see MultipartFile
	 */
	public FileDTO uploadFile(String name, MultipartFile uploadFile) {
		FileEntity uploadedFile = new FileEntity();

		uploadedFile.setName(name);

		try {
			uploadedFile.setData(uploadFile.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (uploadedFile.getData() != null) {
			return this.fileMapper.toDto(this.fileRepository.save(uploadedFile));
		} else {
			return null;
		}
	}

	/**
	 * Returns a file by UID
	 * 
	 * @param uid to search for
	 * @return FileDTO
	 * @see FileDTO
	 */
	public FileDTO getFileByUID(Long uid) {
		return this.fileMapper.toDto(this.fileRepository.getOne(uid));
	}

	/**
	 * Returns a list of all stored files
	 * 
	 * @return List<FileDTO>
	 * @see FileDTO
	 */
	public List<FileDTO> getAllFiles() {
		return this.fileMapper.toDto(this.fileRepository.findAll());
	}

	/**
	 * Renames a file by UID
	 * 
	 * @param uid     of file to rename
	 * @param newName to assign to file
	 */
	public FileDTO renameFile(Long uid, String newName) {
		FileEntity editingFile = this.fileRepository.getOne(uid);
		editingFile.setName(newName);
		return this.fileMapper.toDto(this.fileRepository.save(editingFile));
	}

	/**
	 * Stages a file for deletion "in trash" by UID
	 * 
	 * @param uid of file to put "in trash"
	 */
	public FileDTO trashFile(Long uid) {
		FileEntity editingFile = this.fileRepository.getOne(uid);
		editingFile.setInTrash(true);
		return this.fileMapper.toDto(this.fileRepository.save(editingFile));
	}

	/**
	 * Moves file into root directory by UID
	 * 
	 * @param fileUid of file to move
	 */
	public FileDTO moveFile(Long fileUid) {
		FileEntity editingFile = this.fileRepository.getOne(fileUid);
		editingFile.setContainer(null);
		return this.fileMapper.toDto(this.fileRepository.save(editingFile));
	}

	/**
	 * Moves file into specified directory by UID
	 * 
	 * @param fileUid   of file to move
	 * @param folderUid of destination to move file to
	 */
	public FileDTO moveFile(Long fileUid, Long folderUid) {
		FileEntity editingFile = this.fileRepository.getOne(fileUid);
		editingFile.setContainer(this.folderRepository.getOne(folderUid));
		return this.fileMapper.toDto(this.fileRepository.save(editingFile));
	}

	/**
	 * [NOT IMPLEMENTED] Returns all stored files via pagination
	 * 
	 * @param sortBy Method to sort files
	 * @param page   Page of sorted files to return
	 * @param limit  Number of files to return
	 */
//	public void getFiles(String sortBy, Long page, Long limit) {
////		this.fileRepository.findAll(sort)
//	}

	/**
	 * Returns a file entity via UID
	 * @param uid of file to return
	 * @return FileEntity
	 * @see FileEntity
	 */
	public FileEntity getFileEntity(Long uid) {
		return this.fileRepository.getOne(uid);
	}

}
