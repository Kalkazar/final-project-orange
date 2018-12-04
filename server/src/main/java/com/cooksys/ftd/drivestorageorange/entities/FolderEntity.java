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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "folders")
public class FolderEntity { // make shit nullable?
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String folderName; // make it so these are unique
	
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	@CreationTimestamp
	private Timestamp dateCreated;
	
	//@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false)
	@UpdateTimestamp
	private Timestamp dateLastModified; //consider making final
	
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
	
	public FolderEntity() {
//		this.dateCreated = new Timestamp(System.currentTimeMillis());
	}
	
	public FolderEntity(String folderName) {
//		this.dateCreated = new Timestamp(System.currentTimeMillis());
		this.folderName = folderName;
	}

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

	public Timestamp getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Timestamp dateCreated) {
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
