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
	public FolderDTO uploadFolder(String name) {
		return null;
	}
	
	public FolderDTO createFolder(String name) {
		return this.folderMapper.entityToDto(this.folderRepository.save(new FolderEntity(name)));
	}
	
	public FolderDTO renameFolder(Long uid, String name) {
		FolderEntity folder = this.folderRepository.findFolderEntityByUid(uid);
		folder.setName(name);
		return this.folderMapper.entityToDto(this.folderRepository.save(folder));
	}
	
	public FolderDTO trashFolder(Long uid) {
		FolderEntity folder = this.folderRepository.findFolderEntityByUid(uid);
		folder.setInTrash(true);
		return this.folderMapper.entityToDto(this.folderRepository.save(folder));
	}
	
	public FolderDTO restoreFolder(Long uid) {
		FolderEntity folder = this.folderRepository.findFolderEntityByUid(uid);
		folder.setInTrash(false);
		return this.folderMapper.entityToDto(this.folderRepository.save(folder));
	}
	
	public void deleteFolder(Long uid) {
		FolderEntity deleteTarget = this.folderRepository.getOneTrashed(uid);
		
		if(deleteTarget != null) {
			this.folderRepository.delete(deleteTarget);
		} else {
			System.out.println("No matching target for deletion!");
		}
	}
	
//	@POST /get-folders/
//	Params:
//		(optional) sort_by: foldername (default), uid,
//		(optional) page (default 1, 1-based indexing)
//		(optional) limit: 1-100 (default 100)
//	Returns a list of all current folders names and ids
	// would this be done with a whole lotta method overloading?
//	public List<FolderDTO> getFolders(int limit) {
//		List<FolderDTO> dtoList = this.folderMapper.entitiesToDtos(this.folderRepository.findAll());
//		if(dtoList.size() > limit) {
//			dtoList.subList(limit, dtoList.size()).clear();
//		}
//		return dtoList;
//	}
}
