package com.book.my.trip.repository;

import com.book.my.trip.entity.HotelDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<HotelDetails,Long> {

}

