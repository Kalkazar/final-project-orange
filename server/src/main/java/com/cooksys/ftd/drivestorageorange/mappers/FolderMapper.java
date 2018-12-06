package com.cooksys.ftd.drivestorageorange.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.dtos.FolderViewDTO;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

@Mapper(componentModel = "spring", uses = { FileMapper.class })
public interface FolderMapper {
	
	@Mapping(source = "container.uid", target = "containerId")
	FolderDTO toDto(FolderEntity entity);
	
	@Mapping(source = "container.uid", target = "containerId")
	FolderViewDTO toViewDto(FolderEntity entity);

	List<FolderDTO> toDto(List<FolderEntity> entity);
	
	List<FolderViewDTO> toViewDto(List<FolderEntity> entity);

}
