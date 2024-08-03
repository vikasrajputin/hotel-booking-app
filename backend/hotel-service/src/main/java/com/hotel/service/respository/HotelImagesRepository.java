package com.hotel.service.respository;

import com.hotel.service.Status.RoomType;
import com.hotel.service.entity.HotelImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelImagesRepository extends JpaRepository<HotelImages,Long> {

    HotelImages findByHotelIdAndRoomType(Long hotelId, RoomType roomType);
    List<HotelImages> findByHotelId(Long hotelId);


}
