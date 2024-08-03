package com.book.my.trip.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
public class HotelDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_Id")
    private Long id;
    private String stateLocation;
    private String hotelName;
    private String cityLocation;

    private String nearplace;

    private Long totalRoom;

    @Enumerated(EnumType.STRING)
    private Status status;


    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<Room> rooms;

    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<Booking> bookings;



    @OneToMany(mappedBy = "hotelDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RatingComments> ratingComments;


    @OneToMany(mappedBy = "hotelDetails", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StarRating> starRating;

    public HotelDetails() {
        // Optional: You can initialize collections or other fields here
    }




}