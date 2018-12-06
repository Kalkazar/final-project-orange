package com.cooksys.ftd.drivestorageorange.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.ftd.drivestorageorange.dtos.FileDTO;
import com.cooksys.ftd.drivestorageorange.entities.FileEntity;

@Mapper(componentModel = "spring")
public interface FileMapper {

	@Mapping(source = "container.uid", target = "containerId")
	FileDTO toDto(FileEntity entity);

	List<FileDTO> toDto(List<FileEntity> entity);

}
