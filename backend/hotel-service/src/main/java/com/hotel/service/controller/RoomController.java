package com.hotel.service.controller;


import com.hotel.service.Status.RoomType;
import com.hotel.service.dto.DeleteMessage;
import com.hotel.service.dto.RoomDTO;
import com.hotel.service.entity.Room;
import com.hotel.service.exception.NotFoundException;
import com.hotel.service.respository.RoomRepository;
import com.hotel.service.service.RoomService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/hotel/{hotelId}/room")
    public ResponseEntity<RoomDTO> addRoom(@PathVariable Long hotelId, @RequestBody Room room) {
        RoomDTO roomDTO = roomService.addRoom(hotelId, room);
        return ResponseEntity.ok(roomDTO);
    }

    @GetMapping("/hotel/{hotelId}/room")
    public ResponseEntity<List<RoomDTO>> getHotelRoom(@PathVariable Long hotelId) {
        List<RoomDTO> roomDTOs = roomService.getHotelRoom(hotelId);
        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/hotel/{hotelId}/room/{roomId}")
    public ResponseEntity<RoomDTO> getRoomId(@PathVariable Long hotelId, @PathVariable Long roomId) {
        RoomDTO roomDTO = roomService.getRoomId(hotelId, roomId);
        return ResponseEntity.ok(roomDTO);
    }

    @PutMapping("/hotel/{hotelId}/room/{roomId}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable Long hotelId, @PathVariable Long roomId, @RequestBody Room room) {
        RoomDTO roomDTO = roomService.updateRoom(hotelId, roomId, room);
        return ResponseEntity.ok(roomDTO);
    }

    @DeleteMapping("/hotel/{hotelId}/room/{roomId}")
    public ResponseEntity<DeleteMessage> deleteRoom(@PathVariable Long hotelId, @PathVariable Long roomId) {
        try {
            roomService.deleteRoom(hotelId, roomId);
            DeleteMessage response = new DeleteMessage("Room deleted successfully");
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            DeleteMessage response = new DeleteMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
//        catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the room");
//        }
    }
}