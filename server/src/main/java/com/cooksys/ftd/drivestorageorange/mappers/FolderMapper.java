package com.cooksys.ftd.drivestorageorange.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.cooksys.ftd.drivestorageorange.dtos.FolderDTO;
import com.cooksys.ftd.drivestorageorange.entities.FolderEntity;

@Mapper(componentModel = "spring", uses = FileMapper.class)
public interface FolderMapper {
	
	@Mappings({
		@Mapping(source = "container.uid", target = "containerId"),
		@Mapping(source = "filesContained", target = "filesContained"),
		@Mapping(source = "foldersContained", target = "foldersContained")
	})
	FolderDTO toDto(FolderEntity entity);

	List<FolderDTO> toDto(List<FolderEntity> entity);

}
