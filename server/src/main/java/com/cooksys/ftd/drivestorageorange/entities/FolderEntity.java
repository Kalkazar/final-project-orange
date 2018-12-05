package com.cooksys.ftd.drivestorageorange.entities;

import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "folders")
public class FolderEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long uid;
	
	@Column(nullable = false)
	private String name; // make it so these are unique
	
	@Column(nullable = false)
	@CreationTimestamp
	private Timestamp dateCreated;
	
	@Column(nullable = false)
	@UpdateTimestamp
	private Timestamp dateLastModified;
	
	@ManyToOne
	@JoinColumn(nullable=true) // IS THIS RIGHT?
	private FolderEntity container;
	
	@Column
	private boolean inTrash;
	
	@OneToMany
	@JoinColumn(nullable=true) // IS THIS RIGHT?
	private Set<FileEntity> containerFiles; // rename?
	
	@OneToMany
	@JoinColumn(nullable=true) // IS THIS RIGHT?
	private Set<FolderEntity> containerFolders; // rename?
	
	public FolderEntity() {}
	
	public FolderEntity(String folderName) {
		this.name = folderName;
	}

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

	public Timestamp getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Timestamp dateCreated) { // consider deleting
		this.dateCreated = dateCreated;
	}

	public Timestamp getDateLastModified() {
		return dateLastModified;
	}

	public void setDateLastModified(Timestamp dateLastModified) {
		this.dateLastModified = dateLastModified;
	}

	public FolderEntity getContainer() {
		return container;
	}

	public void setContainer(FolderEntity container) {
		this.container = container;
	}

	public boolean isInTrash() {
		return inTrash;
	}

	public void setInTrash(boolean isInTrash) {
		this.inTrash = isInTrash;
	}

	public Set<FileEntity> getContainedFiles() {
		return containerFiles;
	}

	public void setContainedFiles(Set<FileEntity> containedFiles) {
		this.containerFiles = containedFiles;
	}

	public Set<FolderEntity> getContainedFolders() {
		return containerFolders;
	}

	public void setContainedFolders(Set<FolderEntity> containedFolders) {
		this.containerFolders = containedFolders;
	}
	
	// perhaps generate .hashCode() and .equals() method?
}
