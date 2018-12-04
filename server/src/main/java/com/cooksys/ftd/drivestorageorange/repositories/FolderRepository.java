package com.cooksys.ftd.drivestorageorange.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

public interface FolderRepository extends JpaRepository<FolderEntity, Long> {
	
	FolderEntity findFolderEntityById(Long id);
	
	//FolderEntity saveFolderEntityByFolderName(String folderName); // IS THIS RIGHT?
}
