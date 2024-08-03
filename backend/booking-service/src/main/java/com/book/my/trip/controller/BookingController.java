package com.book.my.trip.controller;


import com.book.my.trip.dto.*;
import com.book.my.trip.entity.Booking;
import com.book.my.trip.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BookingController {


    @Autowired
    private BookingService bookingService;


    @PostMapping("/hotel/{hotelId}/room/{roomId}/user/{userId}/booking")
    public ResponseEntity<BookingDTO> addBooking(@PathVariable Long hotelId, @PathVariable Long roomId, @PathVariable String userId, @RequestBody Booking booking) {
        BookingDTO response = bookingService.saveBooking(hotelId, roomId, userId, booking);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/getBooking/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingId(@PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }

    @GetMapping("/getAllBookings")
    public ResponseEntity<List<BookingDTO>> allBookingInfo() {
        return ResponseEntity.ok(bookingService.getAllBooking());
    }






    @GetMapping("/userHistory/{userId}/{startMonth}/{endMonth}/{year}")
    public ResponseEntity<List<UserBookedHistoryDTO>> getUserBookingsByDateRange(
            @PathVariable String userId,
            @PathVariable int startMonth,
            @PathVariable int endMonth,
            @PathVariable int year) {

        List<UserBookedHistoryDTO> dtos = bookingService.getUserBookingsByDateRange(userId, startMonth, endMonth, year);
        return ResponseEntity.ok(dtos);
    }



    @GetMapping("/userHistory/{userId}")
    public ResponseEntity<List<UserBookedHistoryDTO>> getUserBookingsHistroy(
            @PathVariable String userId
           ) {

        List<UserBookedHistoryDTO> dtos = bookingService.getUserBookingsHistory(userId);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/userInfo/{userId}")
    public ResponseEntity <UserInfoDTO> getUserInfo(@PathVariable String userId) {
        UserInfoDTO dtos = bookingService.getUserInfo(userId);
        return ResponseEntity.ok(dtos);
    }


    @PostMapping("/calculate")
    public TotalAmountRep calculatePrice(@RequestBody TotalAmountReq request) {
        return bookingService.calculatePrice(request);
    }





//
//
//
//
//
//

    @GetMapping("/cancelBooking/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId) {
        String result = bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok(result);
    }
//
//
//
}
