package com.cooksys.ftd.drivestorageorange.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.cooksys.ftd.drivestorageorange.dtos.FileDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;
import com.cooksys.ftd.drivestorageorange.mappers.helpers.FileMapperHelper;

@Mapper(componentModel = "spring", uses = FileMapperHelper.class)
public interface FileMapper {

	public static FileMapper INSTANCE = Mappers.getMapper(FileMapper.class);

	@Mapping(target = "containerId", source = "container")
	FileDTO toDto(FileEntity entity);

//	@Mapping(target = "containerId", source = "container")
	List<FileDTO> toDto(List<FileEntity> entity);

	// Unused methods
//	FileEntity toEntity(FileDTO dto);
//	List<FileEntity> toEntity(List<FileDTO> entity);

}
