package com.cooksys.ftd.drivestorageorange.dtos;

import java.util.List;

public class FilesAndFoldersDTO {

	private List<FolderDTO> folders;
	private List<FileDTO> files;

	public FilesAndFoldersDTO() {
	}

	public FilesAndFoldersDTO(List<FolderDTO> folders, List<FileDTO> files) {
		this.folders = folders;
		this.files = files;
	}

	public List<FolderDTO> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderDTO> folders) {
		this.folders = folders;
	}

	public List<FileDTO> getFiles() {
		return files;
	}

	public void setFiles(List<FileDTO> files) {
		this.files = files;
	}
	
	

}
