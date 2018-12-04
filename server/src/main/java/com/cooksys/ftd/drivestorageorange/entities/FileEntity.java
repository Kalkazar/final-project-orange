package com.cooksys.ftd.drivestorageorange.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "files")
public class FileEntity {
	
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

	@Column(nullable = false, name = "file_data")
	private byte[] data;
	
//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(nullable = true)
//	private FolderEntity container;
	
	@Column(nullable = false, name = "in_trash")
	private boolean inTrash;
	
	public FileEntity() {}
	
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

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

//	public FolderEntity getContainer() {
//		return container;
//	}
//
//	public void setContainer(FolderEntity container) {
//		this.container = container;
//	}

	public boolean isInTrash() {
		return inTrash;
	}

	public void setInTrash(boolean inTrash) {
		this.inTrash = inTrash;
	}

	

}
