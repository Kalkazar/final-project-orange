package com.cooksys.ftd.drivestorageorange.dtos;

public class FolderDTO {
	
	private Long uid;
	private String name;
	private boolean inTrash;
	
	public FolderDTO() {}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isInTrash() {
		return inTrash;
	}

	public void setInTrash(boolean inTrash) {
		this.inTrash = inTrash;
	}
	
}
