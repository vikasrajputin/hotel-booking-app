package com.hotel.service.service;


import com.hotel.service.dto.RoomDTO;
import com.hotel.service.entity.HotelDetails;
import com.hotel.service.entity.Room;
import com.hotel.service.exception.NotFoundException;
import com.hotel.service.respository.HotelRepository;
import com.hotel.service.respository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    public RoomDTO addRoom(Long hotelId, Room room) {
        Optional<HotelDetails> hotelOptional = hotelRepository.findById(hotelId);
        if (hotelOptional.isPresent()) {
            HotelDetails hotel = hotelOptional.get();
            room.setHotel(hotel);  // Use the hotel object directly instead of hotel ID
            room.setCityLocation(hotel.getCityLocation());
            room.setHotelName(hotel.getHotelName());
            room.setStateLocation(hotel.getStateLocation());
            Room savedRoom = roomRepository.save(room);
            return convertToDTO(savedRoom);
        } else {
            throw new NotFoundException("Hotel with ID " + hotelId + " not found");
        }
    }

    public List<RoomDTO> getHotelRoom(Long hotelId) {
        Optional<HotelDetails> hotelOptional = hotelRepository.findById(hotelId);
        if (hotelOptional.isPresent()) {
            List<Room> rooms = roomRepository.findByHotelId(hotelId);
            return rooms.stream().map(this::convertToDTO).toList();
        } else {
            throw new NotFoundException("Hotel with ID " + hotelId + " not found");
        }
    }

    public RoomDTO getRoomId(Long hotelId, Long roomId) {
        Optional<HotelDetails> hotelOptional = hotelRepository.findById(hotelId);
        if (hotelOptional.isPresent()) {
            Optional<Room> roomOptional = roomRepository.findById(roomId);
            if (roomOptional.isPresent()) {
                return convertToDTO(roomOptional.get());
            } else {
                throw new NotFoundException("Room with ID " + roomId + " not found");
            }
        } else {
            throw new NotFoundException("Hotel with ID " + hotelId + " not found");
        }
    }

    public RoomDTO updateRoom(Long hotelId, Long roomId, Room updatedRoom) {
        Optional<HotelDetails> hotelOptional = hotelRepository.findById(hotelId);
        if (hotelOptional.isPresent()) {
            Optional<Room> roomOptional = roomRepository.findById(roomId);
            if (roomOptional.isPresent()) {
                Room existingRoom = roomOptional.get();

                if (updatedRoom.getRoomType() != null) {
                    existingRoom.setRoomType(updatedRoom.getRoomType());
                }
                if (updatedRoom.getRoomNumber() != null) {
                    existingRoom.setRoomNumber(updatedRoom.getRoomNumber());
                }
                if (updatedRoom.getRoomPrice() != null) {
                    existingRoom.setRoomPrice(updatedRoom.getRoomPrice());
                }
                if (updatedRoom.getAdults() != null) {
                    existingRoom.setAdults(updatedRoom.getAdults());
                }
                if (updatedRoom.getChildren() != null) {
                    existingRoom.setChildren(updatedRoom.getChildren());
                }
                if (updatedRoom.getStatus() != null) {
                    existingRoom.setStatus(updatedRoom.getStatus());
                }
                if (updatedRoom.getRoomDescription() != null) {
                    existingRoom.setRoomDescription(updatedRoom.getRoomDescription());
                }

                if (updatedRoom.getStateLocation() != null) {
                    existingRoom.setStateLocation(updatedRoom.getStateLocation());
                }
                if (updatedRoom.getTotalRoom() != null) {
                    existingRoom.setTotalRoom(updatedRoom.getTotalRoom());
                }
//                if (updatedRoom.getTotalGuest() != null) {
//                    existingRoom.setTotalGuest(updatedRoom.getTotalGuest());
//                }

                Room savedRoom = roomRepository.save(existingRoom);
                return convertToDTO(savedRoom);
            } else {
                throw new NotFoundException("Room with ID " + roomId + " not found");
            }
        } else {
            throw new NotFoundException("Hotel with ID " + hotelId + " not found");
        }
    }

    public void deleteRoom(Long hotelId, Long roomId) {
        Optional<HotelDetails> hotelOptional = hotelRepository.findById(hotelId);
        if (hotelOptional.isPresent()) {
            Optional<Room> roomOptional = roomRepository.findById(roomId);
            if (roomOptional.isPresent()) {
                roomRepository.deleteById(roomId);
            } else {
                throw new NotFoundException("Room with ID " + roomId + " not found");
            }
        } else {
            throw new NotFoundException("Hotel with ID " + hotelId + " not found");
        }
    }


    private RoomDTO convertToDTO(Room room) {
        return new RoomDTO(
                room.getRoomId(),
                room.getRoomType(),
                room.getRoomNumber(),
                room.getRoomPrice(),
                room.getAdults(),
                room.getChildren(),
                room.getStatus(),
                room.getRoomDescription(),
                room.getHotelName(),
                room.getCityLocation(),
                room.getStateLocation(),
                room.getTotalRoom()

        );
    }
}
