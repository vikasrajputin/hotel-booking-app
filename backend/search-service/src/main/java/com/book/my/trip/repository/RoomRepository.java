package com.book.my.trip.repository;

import com.book.my.trip.entity.Room;
import com.book.my.trip.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoomRepository extends JpaRepository<Room,Long>,RoomRepositoryCustom  {
//
//    @Query("SELECT COUNT(r) FROM Room r WHERE r.hotel.id = :hotelId AND r.status = :status")
//    long countAvailableRooms(Long hotelId, String status);

//    @Query("SELECT COUNT(r) FROM Room r WHERE r.hotel.id = :hotelId AND r.status = :status")
//    long countAvailableRooms(Long hotelId, Status status);


    @Query("SELECT COUNT(r) FROM Room r WHERE r.hotel.id = :hotelId AND r.status = :status")
    long countAvailableRooms( Long hotelId,  Status status);

    Optional<Room> findById(Long id);

}
