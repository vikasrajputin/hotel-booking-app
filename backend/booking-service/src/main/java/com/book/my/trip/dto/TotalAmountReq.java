package com.book.my.trip.dto;


import lombok.Data;

import java.time.LocalDate;

@Data
public class TotalAmountReq {
    private LocalDate checkInTime;
    private LocalDate checkOutTime;
    private int totalRoom;
    private double totalPrice;

}
