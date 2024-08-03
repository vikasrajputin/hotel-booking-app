package com.book.my.trip.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class StarRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    HotelDetails hotelDetails;

    private Long starNumber;

    private String userName;

    private String userId;

    private LocalDate starRatingDate;
}
