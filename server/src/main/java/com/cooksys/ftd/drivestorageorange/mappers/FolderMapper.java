package com.cooksys.ftd.drivestorageorange.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

@Mapper(componentModel = "spring")
public interface FolderMapper {
	
	@Mapping(source = "container.uid", target = "containerId")
	FolderDTO toDto(FolderEntity entity);

	List<FolderDTO> toDto(List<FolderEntity> entity);

}
