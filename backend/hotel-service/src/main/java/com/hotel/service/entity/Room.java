package com.hotel.service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hotel.service.Status.RoomStatus;
import com.hotel.service.Status.RoomType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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
    private RoomStatus status;  // Changed 'Status' to 'status' to follow Java naming conventions


    private String roomDescription;

    private String hotelName;

    private String cityLocation;

    private String stateLocation;


    private Long totalRoom;




    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "hotel_id")  // Explicitly define the foreign key column
    private HotelDetails hotel;

    @Transient
    private Double averageRating;
    @Transient
    private Long ratingCount;



}
