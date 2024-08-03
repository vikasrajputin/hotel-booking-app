package com.hotel.service.controller;


import com.hotel.service.Status.RoomType;
import com.hotel.service.dto.DeleteMessage;
import com.hotel.service.dto.HotelDetailDTO;
import com.hotel.service.dto.ImagesResponse;
import com.hotel.service.dto.RoomDTO;
import com.hotel.service.entity.HotelDetails;
import com.hotel.service.entity.HotelImages;
import com.hotel.service.entity.Room;
import com.hotel.service.exception.NotFoundException;
import com.hotel.service.respository.RoomRepository;
import com.hotel.service.service.HotelService;
import com.hotel.service.service.RoomService;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.sql.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class HotelController {


    @Autowired
    private HotelService hotelService;


    @PostMapping("/hotel")
    public ResponseEntity<HotelDetailDTO> addHotel(@RequestBody HotelDetails hotel) {
        return ResponseEntity.ok(hotelService.addHotel(hotel));
    }

    @PutMapping("/hotel/{hotelId}")
    public ResponseEntity<HotelDetailDTO> updateHotel(@PathVariable Long hotelId, @RequestBody HotelDetails hotelDetails) {
        return ResponseEntity.ok(hotelService.updateHotel(hotelId, hotelDetails));
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<HotelDetailDTO> getHotelById(@PathVariable Long hotelId) {
        return ResponseEntity.ok(hotelService.getHotelByID(hotelId));
    }

    @GetMapping("/hotel")
    public ResponseEntity<List<HotelDetailDTO>> getHotels() {
        return ResponseEntity.ok(hotelService.getAllDetails());
    }

    @DeleteMapping("/hotel/{id}")
    public ResponseEntity<DeleteMessage> delete(@PathVariable Long id) {
        try {
            hotelService.deleteHotel(id);

            DeleteMessage response = new DeleteMessage("Hotel with id " + id +" deleted successfully");
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            DeleteMessage response = new DeleteMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


}

