package com.hotel.service.respository;



import com.hotel.service.dto.HotelDetailDTO;
import com.hotel.service.entity.HotelDetails;
import com.hotel.service.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface RoomRepository extends JpaRepository<Room,Long> {


//        @Query("SELECT r FROM Room r WHERE "
//                + "(:stateLocation IS NULL OR r.stateLocation = :stateLocation) AND "
//                + "(:adults IS NULL OR r.adults = :adults) AND "
//                + "(:children IS NULL OR r.children = :children) AND "
//                + "(:minPrice IS NULL OR r.roomPrice >= :minPrice) AND "
//                + "(:maxPrice IS NULL OR r.roomPrice <= :maxPrice) AND "
//                + "(:checkIn IS NULL OR :checkOut IS NULL OR "
//                + "(r.checkIn <= :checkIn AND r.checkOut >= :checkOut))"
//        )
//        List<Room> findHotels(@Param("stateLocation") String stateLocation,
//                                      @Param("adults") Integer adults,
//                                      @Param("children") Integer children,
//                                      @Param("minPrice") Double minPrice,
//                                      @Param("maxPrice") Double maxPrice,
//                                      @Param("checkIn") LocalDate checkIn,
//                                      @Param("checkOut") LocalDate checkOut);


//        @Query("SELECT r, AVG(rc.rating) as averageRating  , COUNT(rc) as ratingCount  FROM Room r "
//                + "LEFT JOIN RatingComments rc ON r.hotel.id = rc.hotelDetails.id "
//                + "WHERE r.status = 'AVAILABLE' AND "
////                + "WHERE"
//               + " (:stateLocation IS NULL OR r.stateLocation = :stateLocation) AND "
//                + "(:adults IS NULL OR r.adults = :adults) AND "
//                + "(:children IS NULL OR r.children = :children) AND "
//                + "(:minPrice IS NULL OR r.roomPrice >= :minPrice) AND "
//                + "(:maxPrice IS NULL OR r.roomPrice <= :maxPrice) AND "
//                + "(:checkIn IS NULL OR :checkOut IS NULL OR "
//                + "(r.checkIn <= :checkIn AND r.checkOut >= :checkOut)) "
//                + "GROUP BY r")
//        List<Object[]> findHotelsWithAverageRating(@Param("stateLocation") String stateLocation,
//                                                   @Param("adults") Integer adults,
//                                                   @Param("children") Integer children,
//                                                   @Param("minPrice") Double minPrice,
//                                                   @Param("maxPrice") Double maxPrice,
//                                                   @Param("checkIn") LocalDate checkIn,
//                                                   @Param("checkOut") LocalDate checkOut);
//
//
//


        @Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId")
        List<Room> findByHotelId(Long hotelId);
}
