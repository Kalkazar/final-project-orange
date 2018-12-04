package com.cooksys.ftd.drivestorageorange.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

@Mapper(componentModel = "spring")
public interface FolderMapper {
	
	FolderEntity dtoToEntity(FolderDTO dto);// Necessary? Delete?
	FolderDTO entityToDto(FolderEntity entity);
	
	List<FolderDTO> entitiesToDtos(List<FolderEntity> entities);
}
