package com.book.my.trip.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class RatingComments {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "hotel_id")
    HotelDetails hotelDetails;

    private Double rating;
    private String comments;


    public RatingComments(Long id, HotelDetails hotelDetails, Double rating, String comments) {
        this.id = id;
        this.hotelDetails = hotelDetails;
        this.rating = rating;
        this.comments = comments;
    }

    public RatingComments() {
    }


}
