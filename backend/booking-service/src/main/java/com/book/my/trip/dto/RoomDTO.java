package com.book.my.trip.dto;

import com.book.my.trip.Status.ReviewTitle;
import com.book.my.trip.Status.RoomType;
import com.book.my.trip.entity.HotelDetails;
import lombok.Data;

import java.math.BigDecimal;


@Data
public class RoomDTO {


    private Long roomId;
    private String hotelName;
    private String cityLocation;
    private String stateLocation;
    private RoomType roomType;
    private Long adults;
    private Long children;
    private BigDecimal roomPrice;
    private Double averageRating;
    private Long ratingCount;
    private Long hotelId;
    private ReviewTitle reviewTitle;
    private BigDecimal adjustedPrice;
    private Long totalRoom;
    private Long perNightRoom; // Add this field


}
