package com.book.my.trip.repository;


import com.book.my.trip.dto.UserBookedHistoryDTO;
import com.book.my.trip.entity.Booking;
import com.book.my.trip.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookIngRepository extends JpaRepository<Booking,Long> {


    List<Booking> findByUserId(String userId);

    @Query("SELECT b FROM Booking b WHERE b.userId = :userId AND EXTRACT(MONTH FROM b.bookingDate) BETWEEN :startMonth AND :endMonth AND EXTRACT(YEAR FROM b.bookingDate) = :year")
    List<Booking> findBookingsByUserIdAndDateRange(
             String userId,
             int startMonth,
           int endMonth,
           int year
    );

    List<Booking> findByRoomAndCheckInBeforeAndCheckOutAfter(Room room, LocalDate checkOut, LocalDate checkIn);






}
