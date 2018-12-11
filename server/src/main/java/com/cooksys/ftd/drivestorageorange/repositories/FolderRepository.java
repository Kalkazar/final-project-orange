package com.cooksys.ftd.drivestorageorange.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

public interface FolderRepository extends JpaRepository<FolderEntity, Long> {
	
	/**
	 * Gets an entity from trashbin via UID, if it exists
	 * @param uid to return from trashbin
	 * @return
	 */
	@Query(value = "SELECT f FROM FolderEntity f WHERE f.name = ?1 ORDER BY f.id DESC")
	List<FolderEntity> getByName(String name);
	
	/**
	 * Gets an entity from trashbin via UID, if it exists
	 * @param uid to return from trashbin
	 * @return
	 */
	@Query(value = "SELECT f FROM FolderEntity f WHERE f.inTrash = true AND f.uid = ?1")
	FolderEntity getOneTrashed(Long uid);
	
	/**
	 * Gets all entities from trashbin, if any
	 * @return
	 */
	@Query(value = "SELECT f FROM FolderEntity f WHERE f.inTrash = true")
	List<FolderEntity> getAllTrashed();
	
}
