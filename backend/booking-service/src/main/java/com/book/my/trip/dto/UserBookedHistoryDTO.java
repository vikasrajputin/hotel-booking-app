package com.book.my.trip.dto;


import com.book.my.trip.entity.GuestInfo;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class UserBookedHistoryDTO {




    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Long numofAdults;
    private Long numofChildren;
    private BigDecimal price;
    private String roomNumber;
    private  String hotelName;
    private String cityLocation;
    private String  stateLocation;
    private String userEmail;
    private String userName;

    private List<GuestInfo> guestInfos;

    public UserBookedHistoryDTO() {
    }


}
