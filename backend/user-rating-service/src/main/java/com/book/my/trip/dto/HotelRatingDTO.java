package com.book.my.trip.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRatingDTO {

    private Double ratings;
    private String comments;
    private String user;
    private LocalDate ratingDate;


}
