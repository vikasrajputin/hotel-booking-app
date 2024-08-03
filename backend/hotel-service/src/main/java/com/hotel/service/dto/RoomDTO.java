package com.hotel.service.dto;

import com.hotel.service.Status.RoomStatus;
import com.hotel.service.Status.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long roomId;
    private RoomType roomType;
    private String roomNumber;
    private BigDecimal roomPrice;
    private Long adults;
    private Long children;
    private RoomStatus status;
    private String roomDescription;
    private String hotelName;
    private String cityLocation;
    private String stateLocation;
    private Long totalRoomType;

}
