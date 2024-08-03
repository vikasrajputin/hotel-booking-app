package com.book.my.trip.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class StarDTO {


    private Long hotelId;
    private Long starNumber;
    private String userId;
    private String userName;
    private LocalDate starRatingDate;

}
