package com.hotel.service.respository;

import com.hotel.service.entity.HotelImagePath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelImagePathRepository extends JpaRepository<HotelImagePath, Long> {
}
