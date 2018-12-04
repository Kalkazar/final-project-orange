package com.cooksys.ftd.drivestorageorange.dtos;

public class FolderDTO {
	
	private Long id;
	private String folderName;
	private boolean inTrash;
	
	public FolderDTO() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public boolean isInTrash() {
		return inTrash;
	}

	public void setInTrash(boolean inTrash) {
		this.inTrash = inTrash;
	}
	
}
