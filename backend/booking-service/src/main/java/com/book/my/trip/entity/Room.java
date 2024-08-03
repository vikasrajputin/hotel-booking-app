package com.book.my.trip.entity;

import com.book.my.trip.Status.ReviewTitle;
import com.book.my.trip.Status.RoomType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    private String roomNumber;
    private BigDecimal roomPrice;
    private Long adults;
    private Long children;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String roomDescription;
    private String hotelName;
    private String cityLocation;
    private String stateLocation;

    private Long totalRoom; // Add this field


    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "hotel_id")
    private HotelDetails hotel;

    @Transient
    private Double averageRating;
    @Transient
    private Long ratingCount;

    @Transient
    private BigDecimal adjustedPrice;


    @Transient
    private ReviewTitle reviewTitle;


}
