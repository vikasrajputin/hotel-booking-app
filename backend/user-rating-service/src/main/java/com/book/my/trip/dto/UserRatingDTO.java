package com.book.my.trip.dto;

import lombok.Data;

import java.time.LocalDate;


@Data
public class UserRatingDTO {

    private Double ratings;
    private String hotelName;
    private String StateLocations;
    private LocalDate ratingDate;
    private String comments;
}
