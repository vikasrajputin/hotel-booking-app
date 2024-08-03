package com.hotel.service.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class HotelImagePath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @ManyToOne
    @JoinColumn(name = "hotel_images_id")
    private HotelImages hotelImages;

    private String imagePath;
}
