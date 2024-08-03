package com.book.my.trip.repository;

import com.book.my.trip.entity.Room;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepositoryCustom {
    List<Room> findAvailableRooms(String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children,double minPrice, double maxPrice);
    List<Room> findHotelsByPriceAsc(LocalDate dateIn, LocalDate dateOut,String stateLocation, double minPrice, double maxPrice);
    List<Room> findHotelsByPriceDesc(LocalDate dateIn, LocalDate dateOut,String stateLocation, double minPrice, double maxPrice);
    List<Room> findRoomsByHighestRating(LocalDate dateIn, LocalDate dateOut, String stateLocation, double minPrice, double maxPrice);
    List<Room> findRoomsByHotelNames(List<String> hotelNames, String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children, double minPrice, double maxPrice);
    List<Room>findHotelNamesRooms(List<String> hotelNames, LocalDate dateIn, LocalDate dateOut, int adults, int children);
}
