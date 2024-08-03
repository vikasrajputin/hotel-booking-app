package com.hotel.service.entity;

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
    private HotelDetails hotelDetails;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HotelDetails getHotelDetails() {
        return hotelDetails;
    }

    public void setHotelDetails(HotelDetails hotelDetails) {
        this.hotelDetails = hotelDetails;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
