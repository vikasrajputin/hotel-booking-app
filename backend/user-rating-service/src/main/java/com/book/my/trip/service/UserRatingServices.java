package com.book.my.trip.service;

import com.book.my.trip.dto.HotelRatingDTO;
import com.book.my.trip.dto.UserRatingDTO;
import com.book.my.trip.entity.*;
import com.book.my.trip.respository.HotelRepository;
import com.book.my.trip.respository.RatingRespository;
import com.book.my.trip.respository.StarRespository;
import com.book.my.trip.respository.UserRespository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserRatingServices {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RatingRespository ratingRepository;

    @Autowired
    private UserRespository userRespository;

    @Autowired
    private StarRespository starRespository;

    private static final Logger logger = Logger.getLogger(UserRatingServices.class.getName());

    @Transactional
    public RatingComments addRatingComments(Long hotelId, String userId, RatingComments ratingComments) {
        logger.info("Finding hotel with ID: " + hotelId);
        Optional<HotelDetails> findHotels = hotelRepository.findById(hotelId);
        logger.info("Hotel found: " + findHotels);

        logger.info("Finding user with ID: " + userId);
        Optional<UserData> user = userRespository.findById(userId);

        if (user.isPresent()) {
            logger.info("User found: " + user.get());
        } else {
            logger.warning("User not found with ID: " + userId);
        }

        if (findHotels.isPresent() && user.isPresent()) {
            HotelDetails hotel = findHotels.get();
            UserData userData = user.get();
            ratingComments.setHotelId(hotel.getId());
            ratingComments.setUserName(userData.getFirstName());
            ratingComments.setUserId(userData.getId());
            ratingComments.setRatingDate(LocalDate.now());
            return ratingRepository.save(ratingComments);
        } else {
            if (!findHotels.isPresent()) {
                logger.warning("Hotel not found with ID: " + hotelId);
            }
            if (!user.isPresent()) {
                logger.warning("User not found with ID: " + userId);
            }
            return null;
        }
    }

    @Transactional
    public StarRating addStarRating(Long hotelId, String userId,StarRating starRating) {
        logger.info("Finding hotel with ID: " + hotelId);
        Optional<HotelDetails> findHotels = hotelRepository.findById(hotelId);
        logger.info("Hotel found: " + findHotels);

        logger.info("Finding user with ID: " + userId);
        Optional<UserData> user = userRespository.findById(userId);

        if (user.isPresent()) {
            logger.info("User found: " + user.get());
        } else {
            logger.warning("User not found with ID: " + userId);
        }

        if (findHotels.isPresent() && user.isPresent()) {
            HotelDetails hotel = findHotels.get();
            UserData userData = user.get();
            starRating.setHotelId(hotel.getId());
            starRating.setUserName(userData.getFirstName());
            starRating.setUserId(userData.getId());
            starRating.setStarRatingDate(LocalDate.now());
            return starRespository.save(starRating);
        } else {
            if (!findHotels.isPresent()) {
                logger.warning("Hotel not found with ID: " + hotelId);
            }
            if (!user.isPresent()) {
                logger.warning("User not found with ID: " + userId);
            }
            return null;
        }
    }







    public List<HotelRatingDTO> getRatingByHotelId(Long hotelId) {
        return ratingRepository.findByHotelId(hotelId);
    }

    public List<UserRatingDTO> getUserTotalRatings(String userId) {
        List<UserRatingDTO> dtos = new ArrayList<>();
        List<RatingComments> userRatings = ratingRepository.findByUserId(userId);

        for (RatingComments rating : userRatings) {
            Long hotelId = rating.getHotelId();
            Optional<HotelDetails> hotelDetailsOpt = hotelRepository.findById(hotelId);

            if (hotelDetailsOpt.isPresent()) {
                HotelDetails hotel = hotelDetailsOpt.get();
                UserRatingDTO dto = new UserRatingDTO();
                dto.setRatings(rating.getRating());
                dto.setHotelName(hotel.getHotelName());
                dto.setStateLocations(hotel.getStateLocation());
                dto.setComments(rating.getComments());
                dto.setRatingDate(rating.getRatingDate());
//                dto.setRatingDate(rating.getRatingDate());
                dtos.add(dto);
            }
        }

        return dtos;
    }


}
