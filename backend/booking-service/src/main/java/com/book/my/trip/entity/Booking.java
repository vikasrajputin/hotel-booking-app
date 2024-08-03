package com.book.my.trip.entity;

import com.book.my.trip.Status.PaymentOption;
import com.book.my.trip.Status.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private LocalDate checkIn;
    private LocalDate checkOut;
    private Long numOfAdults;
    private Long numOfChildren;
    private BigDecimal price;

    private String hotelName;
    private String cityLocation;
    private String stateLocation;

    private String userName;
    private String userEmail;
    private String userId;

    @Enumerated(EnumType.STRING)
    private PaymentOption paymentOption;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "hotel_id")
    private HotelDetails hotel;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date bookingDate;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GuestInfo> guestInfos;


    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkInTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkOutTime;



//    public void setBookingDate(String bookingDate) {
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
//        try {
//            this.bookingDate = formatter.parse(bookingDate);
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//    }
}
