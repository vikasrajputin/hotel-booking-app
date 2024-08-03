package com.hotel.service.respository;

import com.hotel.service.dto.HotelDetailDTO;
import com.hotel.service.entity.HotelDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<HotelDetails,Long> {

//    @Query("SELECT h FROM HotelDetails h WHERE "
//            + "(:stateLocation IS NULL OR h.stateLocation = :stateLocation) AND "
//            + "(:room IS NULL OR h.rooms = :room) AND "
//            + "(:guest IS NULL OR h.guests = :guest) AND "
//            + "(:children IS NULL OR h.children = :children) AND "
//            + "(:minPrice IS NULL OR h.price >= :minPrice) AND "
//            + "(:maxPrice IS NULL OR h.price <= :maxPrice) AND "
//            + "(:checkIn IS NULL OR h.checkIn >= :checkIn) AND "
//            + "(:checkOut IS NULL OR h.checkOut <= :checkOut)")
//    List<HotelDetails> findByCriteria(@Param("stateLocation") String stateLocation,
//                                      @Param("room") Integer room,
//                                      @Param("guest") Integer guest,
//                                      @Param("children") Integer children,
//                                      @Param("minPrice") Double minPrice,
//                                      @Param("maxPrice") Double maxPrice,
//                                      @Param("checkIn") LocalDate checkIn,
//                                      @Param("checkOut") LocalDate checkOut);



//    @Query("SELECT new com.hotel.service.dto.HotelDetailDTO(h.id, COALESCE(AVG(rc.rating), 0.0), h.stateLocation, h.hotelName, h.cityLocation, " +
//            "h.rooms, h.guests, h.children, h.price, h.nearplace, h.checkIn, h.checkOut, h.images) " +
//            "FROM HotelDetails h LEFT JOIN h.ratingComments rc " +
//            "WHERE " +
//            "(:stateLocation IS NULL OR h.stateLocation = :stateLocation) AND " +
//            "(:rooms IS NULL OR h.rooms = :rooms) AND " +
//            "(:guests IS NULL OR h.guests = :guests) AND " +
//            "(:children IS NULL OR h.children = :children) AND " +
//            "(:minPrice IS NULL OR h.price >= :minPrice) AND " +
//            "(:maxPrice IS NULL OR h.price <= :maxPrice) AND " +
//            "(:checkIn IS NULL OR h.checkIn >= :checkIn) AND " +
//            "(:checkOut IS NULL OR h.checkOut <= :checkOut) " +
//            "GROUP BY h.id")
//    List<HotelDetailDTO> findByCriteriaWithAverageRating(
//            @Param("stateLocation") String stateLocation,
//            @Param("rooms") Integer rooms,
//            @Param("guests") Integer guests,
//            @Param("children") Integer children,
//            @Param("minPrice") Double minPrice,
//            @Param("maxPrice") Double maxPrice,
//            @Param("checkIn") LocalDate checkIn,
//            @Param("checkOut") LocalDate checkOut);
//
//
//
//    @Query("SELECT h FROM HotelDetails h WHERE h.stateLocation = :stateLocation ORDER BY h.price ASC")
//    List<HotelDetails> findByStateLocationOrderByPriceAsc( String stateLocation);
//
//    @Query("SELECT h FROM HotelDetails h WHERE h.stateLocation = :stateLocation ORDER BY h.price DESC")
//    List<HotelDetails> findByStateLocationOrderByPriceDesc(String stateLocation);
}

