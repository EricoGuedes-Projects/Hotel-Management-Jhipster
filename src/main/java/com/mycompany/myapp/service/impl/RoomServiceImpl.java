package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Room;
import com.mycompany.myapp.repository.RoomRepository;
import com.mycompany.myapp.service.RoomService;
import com.mycompany.myapp.service.dto.RoomDTO;
import com.mycompany.myapp.service.mapper.RoomMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Room}.
 */
@Service
@Transactional
public class RoomServiceImpl implements RoomService {

    private static final Logger LOG = LoggerFactory.getLogger(RoomServiceImpl.class);

    private final RoomRepository roomRepository;

    private final RoomMapper roomMapper;

    public RoomServiceImpl(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    @Override
    public RoomDTO save(RoomDTO roomDTO) {
        LOG.debug("Request to save Room : {}", roomDTO);
        Room room = roomMapper.toEntity(roomDTO);
        room = roomRepository.save(room);
        return roomMapper.toDto(room);
    }

    @Override
    public RoomDTO update(RoomDTO roomDTO) {
        LOG.debug("Request to update Room : {}", roomDTO);
        Room room = roomMapper.toEntity(roomDTO);
        room = roomRepository.save(room);
        return roomMapper.toDto(room);
    }

    @Override
    public Optional<RoomDTO> partialUpdate(RoomDTO roomDTO) {
        LOG.debug("Request to partially update Room : {}", roomDTO);

        return roomRepository
            .findById(roomDTO.getId())
            .map(existingRoom -> {
                roomMapper.partialUpdate(existingRoom, roomDTO);

                return existingRoom;
            })
            .map(roomRepository::save)
            .map(roomMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RoomDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Rooms");
        return roomRepository.findAll(pageable).map(roomMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RoomDTO> findOne(Long id) {
        LOG.debug("Request to get Room : {}", id);
        return roomRepository.findById(id).map(roomMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Room : {}", id);
        roomRepository.deleteById(id);
    }
}
