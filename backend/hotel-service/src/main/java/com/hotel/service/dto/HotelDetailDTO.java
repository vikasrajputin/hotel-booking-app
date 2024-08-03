package com.hotel.service.dto;


import com.hotel.service.Status.RoomStatus;
import lombok.Data;

@Data
public class HotelDetailDTO {
    private Long id;
    private String stateLocation;
    private String hotelName;
    private String cityLocation;
    private String nearplace;
    private Long totalRoom;
    private RoomStatus status;

}
