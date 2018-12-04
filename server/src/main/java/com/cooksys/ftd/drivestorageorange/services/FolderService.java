package com.cooksys.ftd.drivestorageorange.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
import com.cooksys.ftd.drivestorageorange.mappers.FolderMapper;
import com.cooksys.ftd.drivestorageorange.repositories.FolderRepository;

@Service
public class FolderService {
	
	private FolderRepository folderRepository;
	private FolderMapper folderMapper;
	
	@Autowired
	public FolderService(FolderRepository folderRepository, FolderMapper folderMapper) {
		super();
		this.folderRepository = folderRepository;
		this.folderMapper = folderMapper;
	}
	
	public List<FolderDTO> getAllFolders() {
		return this.folderMapper.entitiesToDtos(this.folderRepository.findAll());
	}
	
//	@POST /folder/{folder_name}/upload
	//	Upload a folder
//	public FolderEntity uploadFolder(String foldername) {
//		return null;
//	}
	
	public Long createFolder(String folderName) {
		return this.folderRepository.save(new FolderEntity(folderName)).getId();
	}
	
	// I think this should return a String: the new folder name
	public String renameFolder(Long id, String folderName) {
		FolderEntity folder = this.folderRepository.findFolderEntityById(id);
		folder.setFolderName(folderName);
		this.folderRepository.save(folder);
		return folder.getFolderName();
	}// can this be further condensed?
	// should this account for when the id is not found?
	
	// I think this should return a Long: the deleted folder id
	public Long deleteFolder(Long id) {
		FolderEntity folder = this.folderRepository.findFolderEntityById(id);
		folder.setInTrash(true);
		this.folderRepository.save(folder);
		return folder.getId();
	}
	
//	@POST /get-folders/
//	Params:
//		(optional) sort_by: foldername (default), uid,
//		(optional) page (default 1, 1-based indexing)
//		(optional) limit: 1-100 (default 100)
//	Returns a list of all current folders names and ids
	// would this be done with a whole lotta method overloading?
}
