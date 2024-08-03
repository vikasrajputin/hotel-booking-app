package com.hotel.service.entity;

import com.hotel.service.Status.RoomType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class HotelImages {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long hotelId;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @OneToMany(mappedBy = "hotelImages", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HotelImagePath> roomImages;

}
