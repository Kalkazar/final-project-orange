package com.cooksys.ftd.drivestorageorange.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	 * @param inputStream file data uploaded as a zip
	 * @return List<FileDTO>
	 * @see List<FileDTO>
	 * @see InputStream
	 */
	public List<FileDTO> uploadFiles(InputStream inputStream) {
		try (ZipInputStream zipInputStream = new ZipInputStream(inputStream);) {
			List<FileDTO> uploadedFiles = new ArrayList<>();
			ZipEntry entry;
			byte[] buffer = new byte[2048];
			while((entry = zipInputStream.getNextEntry()) != null) {
				FileEntity fileToUpload = new FileEntity();
				ByteArrayOutputStream output = null;

				fileToUpload.setName(entry.getName());
				
				try {
					output = new ByteArrayOutputStream();
					int len = 0;
					
					while((len = zipInputStream.read(buffer)) > 0) {
						output.write(buffer, 0, len);
					}
				}
				finally {
					fileToUpload.setData(output.toByteArray());
					
					if(output != null) {
						output.close();
					}
				}
				uploadedFiles.add(this.fileMapper.toDto(this.fileRepository.save(fileToUpload)));
			}
			
			return uploadedFiles;
		} catch(IOException e) {
			e.printStackTrace();
		}
		return null;
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
	public FileDTO moveFile(Long uid) {
		FileEntity editingFile = this.fileRepository.getOne(uid);
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
	 * Returns a file entity via UID
	 * @param uid of file to return
	 * @return FileEntity
	 * @see FileEntity
	 */
	public FileEntity getFileEntity(Long uid) {
		return this.fileRepository.getOne(uid);
	}

}
