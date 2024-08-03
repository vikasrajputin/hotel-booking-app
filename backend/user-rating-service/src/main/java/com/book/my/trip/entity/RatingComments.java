package com.book.my.trip.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class RatingComments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hotel_id")
    private Long hotelId;

    private Double rating;
    private String comments;
    private String userName;
    private String userId;

    private LocalDate ratingDate;

    public RatingComments() {
    }

    public RatingComments(Long id, Long hotelId, Double rating, String comments) {
        this.id = id;
        this.hotelId = hotelId;
        this.rating = rating;
        this.comments = comments;
    }
}
