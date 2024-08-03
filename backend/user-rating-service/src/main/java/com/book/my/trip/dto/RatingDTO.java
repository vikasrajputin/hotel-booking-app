package com.book.my.trip.dto;

import lombok.Data;

@Data
public class RatingDTO {

    private Long hotelId;
    private Double rating;
    private String comments;
    private String userName;

    public RatingDTO() {
    }

    public RatingDTO(Long hotelId, Double rating, String comments, String userName) {
        this.hotelId = hotelId;
        this.rating = rating;
        this.comments = comments;
        this.userName = userName;
    }
}
