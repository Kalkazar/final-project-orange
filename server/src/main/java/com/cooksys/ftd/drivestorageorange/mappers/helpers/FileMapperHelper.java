package com.cooksys.ftd.drivestorageorange.mappers.helpers;

import org.mapstruct.Mapper;

import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

@Mapper(componentModel = "spring")
public class FileMapperHelper {
	
	public Long map(FolderEntity folder) {
		try {
			return folder.getUid();
		} catch (Exception e) {
			return null;
		}
	}

}
