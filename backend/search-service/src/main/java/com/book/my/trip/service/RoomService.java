package com.book.my.trip.service;


import com.book.my.trip.dto.RoomDTO;
import com.book.my.trip.entity.Room;
import com.book.my.trip.repository.RoomRepository;
import com.book.my.trip.status.RoomType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {


    @Autowired
    private RoomRepository roomRepository;

    public List<RoomDTO> getAvailableRooms(String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children, double minPrice, double maxPrice) {
        List<Room> rooms = roomRepository.findAvailableRooms(stateLocation, dateIn, dateOut, adults, children, minPrice, maxPrice);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = convertToDto(room);
            roomDTO.setAdjustedPrice(calculatePrice(room, adults, children));
            roomDTO.setPerNightRoom(calculatePerNightRoom(room, adults));
            if (roomDTO.getPerNightRoom() > room.getTotalRoom()) {
                throw new IllegalArgumentException("Not enough rooms available for the specified number of adults.");
            }
            return roomDTO;
        }).collect(Collectors.toList());
    }



    public List<RoomDTO> getHotelsByPriceAsc(LocalDate dateIn, LocalDate dateOut, String stateLocation, int adults, int children, double minPrice, double maxPrice) {
        List<Room> rooms = roomRepository.findHotelsByPriceAsc(dateIn, dateOut, stateLocation, minPrice, maxPrice);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = convertToDto(room);
            roomDTO.setAdjustedPrice(calculatePrice(room, adults, children));
            roomDTO.setPerNightRoom(calculatePerNightRoom(room, adults));
            return roomDTO;
        }).collect(Collectors.toList());
    }

    public List<RoomDTO> getHotelsByPriceDesc(LocalDate dateIn, LocalDate dateOut, String stateLocation, int adults, int children, double minPrice, double maxPrice) {
        List<Room> rooms = roomRepository.findHotelsByPriceDesc(dateIn, dateOut, stateLocation, minPrice, maxPrice);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = convertToDto(room);
            roomDTO.setAdjustedPrice(calculatePrice(room, adults, children));
            roomDTO.setPerNightRoom(calculatePerNightRoom(room, adults));
            return roomDTO;
        }).collect(Collectors.toList());
    }

    public List<RoomDTO> getRoomsByHighestRating(LocalDate dateIn, LocalDate dateOut, String stateLocation, int adults, int children, double minPrice, double maxPrice) {
        List<Room> rooms = roomRepository.findRoomsByHighestRating(dateIn, dateOut, stateLocation, minPrice, maxPrice);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = convertToDto(room);
            roomDTO.setAdjustedPrice(calculatePrice(room, adults, children));
            roomDTO.setPerNightRoom(calculatePerNightRoom(room, adults));
            return roomDTO;
        }).collect(Collectors.toList());
    }

    public List<RoomDTO> getRoomsByHotelNames(List<String> hotelNames, String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children, double minPrice, double maxPrice) {
        List<Room> rooms = roomRepository.findRoomsByHotelNames(hotelNames, stateLocation, dateIn, dateOut, adults, children, minPrice, maxPrice);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = convertToDto(room);
            roomDTO.setAdjustedPrice(calculatePrice(room, adults, children));
            roomDTO.setPerNightRoom(calculatePerNightRoom(room, adults));
            return roomDTO;
        }).collect(Collectors.toList());
    }

    public List<RoomDTO> geHotelNames(List<String> hotelNames, LocalDate dateIn, LocalDate dateOut, int adults, int children) {
        List<Room> rooms = roomRepository.findHotelNamesRooms(hotelNames, dateIn, dateOut, adults, children);
        return rooms.stream().map(room -> {
            RoomDTO roomDTO = convertToDto(room);
            roomDTO.setAdjustedPrice(calculatePrice(room, adults, children));
            roomDTO.setPerNightRoom(calculatePerNightRoom(room, adults));
            return roomDTO;
        }).collect(Collectors.toList());
    }





    private RoomDTO convertToDto(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setRoomId(room.getRoomId());
        roomDTO.setStateLocation(room.getStateLocation());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setAdults(room.getAdults());
        roomDTO.setChildren(room.getChildren());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setAverageRating(room.getAverageRating());
        roomDTO.setRatingCount(room.getRatingCount());
        roomDTO.setHotelName(room.getHotelName());
        roomDTO.setCityLocation(room.getCityLocation());
        roomDTO.setHotelId(room.getHotel().getId());
        if (room.getReviewTitle() != null) {
            roomDTO.setReviewTitle(room.getReviewTitle().getDisplayName());
        } else {
            roomDTO.setReviewTitle(""); // Or handle null case as needed
        }
        return roomDTO;
    }

    private BigDecimal calculatePrice(Room room, int adults, int children) {
        BigDecimal basePrice = room.getRoomPrice();
        BigDecimal finalPrice = basePrice;

        if (room.getRoomType() == RoomType.DELUXE || room.getRoomType() == RoomType.SUPERDELUXE) {
            if (adults <= 2 && children <= 1) {
                return basePrice;
            } else {
                int additionalAdults = adults - 2;
                finalPrice = basePrice.multiply(BigDecimal.valueOf((additionalAdults / 2) + 1)); // Add a base price for every two additional adults
                if (additionalAdults % 2 != 0) {
                    finalPrice = finalPrice.add(BigDecimal.valueOf(200)); // Add 200 if there is an odd number of additional adults
                }
            }
        }

        return finalPrice;
    }

    private Long calculatePerNightRoom(Room room, int adults) {
        if (adults <= 2) {
            return 1L;
        } else {
            return (long) Math.ceil((double) adults / 2);
        }
    }


}