package com.book.my.trip.controller;

import com.book.my.trip.dto.RoomDTO;
import com.book.my.trip.entity.Room;
import com.book.my.trip.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@CrossOrigin("*")
public class RoomController {
    @Autowired
    private RoomService roomService;




    @GetMapping("/rooms/search")
    public ResponseEntity<List<RoomDTO>> searchRooms(
            @RequestParam String stateLocation,
            @RequestParam String dateIn,
            @RequestParam String dateOut,

            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);

        List<RoomDTO> rooms = roomService.getAvailableRooms(stateLocation, checkIn, checkOut, adults, children, minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }


    @GetMapping("/asc/price")
    public ResponseEntity<List<RoomDTO>> getHotelsByPriceAsc(
            @RequestParam String dateIn,
            @RequestParam String dateOut,
            @RequestParam String stateLocation,
            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);
        List<RoomDTO> rooms = roomService.getHotelsByPriceAsc(checkIn, checkOut, stateLocation, adults, children, minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/desc/price")
    public ResponseEntity<List<RoomDTO>> getHotelsByPriceDesc(
            @RequestParam String dateIn,
            @RequestParam String dateOut,
            @RequestParam String stateLocation,
            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);
        List<RoomDTO> rooms = roomService.getHotelsByPriceDesc(checkIn, checkOut, stateLocation, adults, children, minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/rooms/userRating")
    public ResponseEntity<List<RoomDTO>> getRoomsByHighestRating(
            @RequestParam String dateIn,
            @RequestParam String dateOut,
            @RequestParam String stateLocation,
            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);
        List<RoomDTO> rooms = roomService.getRoomsByHighestRating(checkIn, checkOut, stateLocation, adults, children, minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }



    @GetMapping("room/userStar/{stars}")
    public ResponseEntity<List<RoomDTO>> getRoomsByStar(
            @RequestParam String dateIn,
            @RequestParam String dateOut,
            @RequestParam String stateLocation,
            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice,
            @PathVariable int stars) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);
        List<RoomDTO> rooms = roomService.getRoomsByStar(checkIn, checkOut, stateLocation, adults, children, minPrice, maxPrice, stars);
        return ResponseEntity.ok(rooms);
    }




    @GetMapping("/rooms/hotelNames")
    public ResponseEntity<List<RoomDTO>> getRoomsByHotelNames(
            @RequestParam List<String> hotelNames,
            @RequestParam String stateLocation,
            @RequestParam String dateIn,
            @RequestParam String dateOut,
            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);

        List<RoomDTO> rooms = roomService.getRoomsByHotelNames(hotelNames, stateLocation, checkIn, checkOut, adults, children, minPrice, maxPrice);
        return ResponseEntity.ok(rooms);
    }



    @GetMapping("/rooms/UserRating/{reviewTitle}/{ratingNumber}")
    public ResponseEntity<List<RoomDTO>> getRoomsByUserRating(

            @RequestParam String stateLocation,
            @RequestParam String dateIn,
            @RequestParam String dateOut,
            @RequestParam int adults,
            @RequestParam int children,
            @RequestParam double minPrice,
            @RequestParam double maxPrice,
            @PathVariable String reviewTitle,
            @PathVariable Double ratingNumber) {
        LocalDate checkIn = LocalDate.parse(dateIn);
        LocalDate checkOut = LocalDate.parse(dateOut);

        List<RoomDTO> rooms = roomService.getRoomsByUserRating( stateLocation, checkIn, checkOut, adults, children, minPrice, maxPrice, reviewTitle ,ratingNumber);
        return ResponseEntity.ok(rooms);
    }







}


