package com.cooksys.ftd.drivestorageorange.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class FolderEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long uid;

	@Column(nullable = false)
	private String name;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false, name = "date_created")
	@CreationTimestamp
	private Date created;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false, name = "date_last_modified")
	@UpdateTimestamp
	private Date lastModified;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true)
	@Column(nullable = true, name = "files_contained")
	private List<FileEntity> filesContained;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "container", cascade = CascadeType.ALL, orphanRemoval = true)
	@Column(nullable = true, name = "folders_contained")
	private List<FolderEntity> foldersContained;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = true)
	private FolderEntity container;

	@Column(nullable = false, name = "in_trash")
	private boolean inTrash;

	public FolderEntity() {
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

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public List<FileEntity> getFilesContained() {
		return filesContained;
	}

	public void setFilesContained(List<FileEntity> filesContained) {
		this.filesContained = filesContained;
	}

	public List<FolderEntity> getFoldersContained() {
		return foldersContained;
	}

	public void setFoldersContained(List<FolderEntity> foldersContained) {
		this.foldersContained = foldersContained;
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

	public void setInTrash(boolean inTrash) {
		this.inTrash = inTrash;
	}

}
