package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Room;
import com.mycompany.myapp.service.dto.RoomDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Room} and its DTO {@link RoomDTO}.
 */
@Mapper(componentModel = "spring")
public interface RoomMapper extends EntityMapper<RoomDTO, Room> {}
