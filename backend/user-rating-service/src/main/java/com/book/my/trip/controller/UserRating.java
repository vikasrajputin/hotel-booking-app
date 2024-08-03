package com.book.my.trip.controller;

import com.book.my.trip.dto.HotelRatingDTO;
import com.book.my.trip.dto.StarDTO;
import com.book.my.trip.dto.UserRatingDTO;
import com.book.my.trip.entity.RatingComments;
import com.book.my.trip.entity.StarRating;
import com.book.my.trip.service.UserRatingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("/api/ratings")
@CrossOrigin("*")
public class UserRating {

    @Autowired
    private UserRatingServices userRatingServices;

    @PostMapping("/api/ratings/{hotelId}/{userId}")
    public ResponseEntity<RatingComments> addRatingComments(@PathVariable Long hotelId, @PathVariable String userId, @RequestBody RatingComments ratingComments) {
        RatingComments addedRating = userRatingServices.addRatingComments(hotelId, userId, ratingComments);
        if (addedRating != null) {
            return ResponseEntity.ok(addedRating);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }


    @PostMapping("/api/ratings/star/{hotelId}/{userId}")
    public ResponseEntity<StarRating> addStar(@PathVariable Long hotelId , @PathVariable String userId, @RequestBody StarRating starRating){
        StarRating addstarRating = userRatingServices.addStarRating(hotelId, userId, starRating);
        if (addstarRating != null) {
            return ResponseEntity.ok(addstarRating);
        } else {
            return ResponseEntity.status(404).body(null);
        }

    }


    @GetMapping("/rating/{hotelId}")
public ResponseEntity<List<HotelRatingDTO>> findHotelRating(@PathVariable Long hotelId){

        return ResponseEntity.ok(userRatingServices.getRatingByHotelId(hotelId));
}

    @GetMapping("/api/ratings/user/{userId}")
    public ResponseEntity<List<UserRatingDTO>> findUserTotalRating(@PathVariable String userId) {
        List<UserRatingDTO> userRatings = userRatingServices.getUserTotalRatings(userId);
        if (!userRatings.isEmpty()) {
            return ResponseEntity.ok(userRatings);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}



