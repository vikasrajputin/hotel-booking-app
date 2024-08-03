package com.book.my.trip.respository;

import com.book.my.trip.entity.StarRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StarRespository extends JpaRepository<StarRating , Long> {
}
