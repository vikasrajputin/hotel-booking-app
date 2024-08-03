package com.book.my.trip.respository;


import com.book.my.trip.dto.HotelRatingDTO;
import com.book.my.trip.entity.RatingComments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRespository extends JpaRepository<RatingComments,Long> {


    @Query("SELECT new com.book.my.trip.dto.HotelRatingDTO(r.rating, r.comments, r.userName,r.ratingDate) " +
            "FROM RatingComments r WHERE r.hotelId = :hotelId")
    List<HotelRatingDTO> findByHotelId(Long hotelId);

    @Query("SELECT r FROM RatingComments r WHERE r.userId = :userId")
    List<RatingComments> findByUserId( String userId);


//    @Query("SELECT AVG(r.rating) FROM RatingComments r WHERE r.hotelId = :hotelId")
//    Double findAverageRatingByHotelId( Long hotelId);


}
