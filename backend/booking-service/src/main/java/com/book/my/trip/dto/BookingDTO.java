package com.book.my.trip.dto;

import com.book.my.trip.Status.PaymentOption;
import com.book.my.trip.Status.PaymentStatus;
import com.book.my.trip.entity.GuestInfo;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Getter
public class BookingDTO {
    private Long bookingId;
    private Long hotelId;
    private Long roomId;
    private String userId;
    private String hotelName;
    private String cityLocation;
    private String stateLocation;
    private BigDecimal price;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String userName;
    private String userEmail;
    private PaymentOption paymentOption;
    private Date bookingDate;
    private PaymentStatus paymentStatus;
    private List<GuestInfo> guestInfo;

    // Getters and setters
}