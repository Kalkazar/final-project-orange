package com.cooksys.ftd.drivestorageorange.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;
import com.cooksys.ftd.drivestorageorange.repositories.FolderRepository;

@Service
public class FolderService {
	
	private FolderRepository folderRepository;
	
	@Autowired
	public FolderService(FolderRepository folderRepository) {
		super();
		this.folderRepository = folderRepository;
	}
	
//	@POST /folder/{folder_name}/upload
	//	Upload a folder
//	public FolderEntity uploadFolder(String foldername) {
//		return null;
//	}
	
	// @POST /folder/{folder_name}
	public Long createFolder(String folderName) {
//		FolderEntity folder = this.folderRepository.save(new FolderEntity(folderName));
//		return folder.getId(); // can this be one line?
		return this.folderRepository.save(new FolderEntity(folderName)).getId();

	}
	
	
//	@PATCH /folder/{folder_uid}/rename/{new_name}
//	renames a folder
	// I think it should return a String: the new folder name
	public String renameFolder(Long id, String folderName) {
		FolderEntity folder = this.folderRepository.findFolderEntityById(id); // SHOULDN'T THIS BE ONE LINE?
		folder.setFolderName(folderName);
		this.folderRepository.save(folder);
		return folder.getFolderName();
		//return this.folderRepository.save(this.folderRepository.findFolderEntityById(id).setFolderName(folderName));
	}// can this be further condensed?
	// should this account for when the id is not found?
	
//	@DELETE /folder/{folder_uid}/
//	Moves a given folder to the trash
	// I think it should return a Long: the deleted folder id
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
