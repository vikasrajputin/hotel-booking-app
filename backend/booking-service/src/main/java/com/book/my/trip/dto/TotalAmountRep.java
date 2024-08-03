package com.book.my.trip.dto;

import lombok.Data;

@Data
public class TotalAmountRep {
    private long totalDay;
    private long totalDayRoomPriceCount;
    private long totalDiscount;
    private long priceAfterDiscount;
    private long taxesAdd;
    private long finalPrice;
}
