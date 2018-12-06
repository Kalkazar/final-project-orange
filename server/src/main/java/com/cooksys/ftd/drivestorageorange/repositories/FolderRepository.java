package com.cooksys.ftd.drivestorageorange.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

public interface FolderRepository extends JpaRepository<FolderEntity, Long> {
	
	FolderEntity findFolderEntityByUid(Long uid);
	
	@Query(value = "SELECT f FROM FolderEntity f WHERE f.inTrash = true AND f.uid = ?1")
	FolderEntity getOneTrashed(Long uid);
	
}
