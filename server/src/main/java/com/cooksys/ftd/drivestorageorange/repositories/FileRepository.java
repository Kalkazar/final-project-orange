package com.cooksys.ftd.drivestorageorange.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cooksys.ftd.drivestorageorange.entities.FileEntity;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
	
	/**
	 * Gets an entity from trashbin via UID, if it exists
	 * @param uid to return from trashbin
	 * @return
	 */
	@Query(value = "SELECT f FROM FileEntity f WHERE f.inTrash = true AND f.uid = ?1")
	FileEntity getOneTrashed(Long uid);
	
	/**
	 * Gets all entities from trashbin, if any
	 * @return
	 */
	@Query(value = "SELECT f FROM FileEntity f WHERE f.inTrash = true")
	List<FileEntity> getAllTrashed();
	
}
