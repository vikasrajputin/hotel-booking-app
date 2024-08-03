package com.book.my.trip.repository;


import com.book.my.trip.Status.ReviewTitle;
import com.book.my.trip.entity.Booking;
import com.book.my.trip.entity.RatingComments;
import com.book.my.trip.entity.Room;
import com.book.my.trip.entity.StarRating;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RoomRepositoryImpl implements RoomRepositoryCustom {


        @PersistenceContext
        private EntityManager entityManager;

        @Override
        public List<Room> findAvailableRooms(String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children, double minPrice, double maxPrice) {
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
            Root<Room> room = query.from(Room.class);

            // Subquery to find rooms that are already booked for the given date range
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<Booking> booking = subquery.from(Booking.class);
            subquery.select(booking.get("room").get("roomId"))
                    .where(
                            cb.equal(booking.get("room"), room),
                            cb.or(
                                    cb.and(
                                            cb.lessThan(booking.get("checkInTime"), LocalDateTime.of(dateOut, LocalTime.of(11, 0))),
                                            cb.greaterThan(booking.get("checkOutTime"), LocalDateTime.of(dateIn, LocalTime.of(11, 0)))
                                    )
                            )
                    );

            // Join with RatingComments to get average rating and rating count
            Join<Room, RatingComments> ratingComments = room.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);

            // Predicates for filtering rooms based on search criteria
            Predicate stateLocationPredicate = cb.equal(room.get("stateLocation"), stateLocation);
//            Predicate adultsPredicate = cb.greaterThanOrEqualTo(room.get("adults"), adults);
//            Predicate childrenPredicate = cb.greaterThanOrEqualTo(room.get("children"), children);
            Predicate pricePredicate = cb.between(room.get("roomPrice"), minPrice, maxPrice);
            Predicate availablePredicate = cb.not(cb.exists(subquery));

            query.multiselect(
                    room,
                    cb.avg(ratingComments.get("rating")).alias("averageRating"),
                    cb.count(ratingComments.get("rating")).alias("ratingCount")
            ).where(
                    stateLocationPredicate,
//                    adultsPredicate,
//                    childrenPredicate,
                    pricePredicate,
                    availablePredicate
            ).groupBy(room.get("roomId"));

            List<Object[]> results = entityManager.createQuery(query).getResultList();

            // Map results to Room entities
            List<Room> rooms = new ArrayList<>();
            for (Object[] result : results) {
                Room r = (Room) result[0];
                Double avgRating = (Double) result[1];
                Long count = (Long) result[2];

                if (avgRating != null) {
                    avgRating = Math.round(avgRating * 10.0) / 10.0;
                }

                r.setAverageRating(avgRating);
                r.setRatingCount(count);
                rooms.add(r);
            }
            return rooms;
        }


    @Override
    public List<Room> findHotelsByPriceAsc(LocalDate dateIn, LocalDate dateOut, String stateLocation, double minPrice, double maxPrice) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<Room> room = query.from(Room.class);

        // Subquery to find rooms that are already booked for the given date range
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Booking> booking = subquery.from(Booking.class);
        subquery.select(booking.get("room").get("roomId"))
                .where(
                        cb.equal(booking.get("room").get("roomId"), room.get("roomId")),
                        cb.lessThanOrEqualTo(booking.get("checkIn"), dateOut),
                        cb.greaterThanOrEqualTo(booking.get("checkOut"), dateIn)
                );

        // Join with RatingComments to get average rating and rating count
        Join<Room, RatingComments> ratingComments = room.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);

        // Predicates for filtering rooms based on search criteria
        Predicate stateLocationPredicate = cb.equal(room.get("stateLocation"), stateLocation);
        Predicate pricePredicate = cb.between(room.get("roomPrice"), minPrice, maxPrice);
        Predicate availablePredicate = cb.not(cb.exists(subquery));

        query.multiselect(
                        room,
                        cb.avg(ratingComments.get("rating")).alias("averageRating"),
                        cb.count(ratingComments.get("rating")).alias("ratingCount")
                ).where(
                        stateLocationPredicate,
                        pricePredicate,
                        availablePredicate
                ).groupBy(room.get("roomId"))
                .orderBy(cb.asc(room.get("roomPrice")));

        List<Object[]> results = entityManager.createQuery(query).getResultList();

        // Map results to Room entities
        List<Room> rooms = new ArrayList<>();
        for (Object[] result : results) {
            Room r = (Room) result[0];
            Double avgRating = (Double) result[1];
            Long count = (Long) result[2];

            if (avgRating != null) {
                avgRating = Math.round(avgRating * 10.0) / 10.0;
            }

            r.setAverageRating(avgRating);
            r.setRatingCount(count);
            rooms.add(r);
        }
        return rooms;
    }

    @Override
    public List<Room> findHotelsByPriceDesc(LocalDate dateIn, LocalDate dateOut, String stateLocation, double minPrice, double maxPrice) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<Room> room = query.from(Room.class);

        // Subquery to find rooms that are already booked for the given date range
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Booking> booking = subquery.from(Booking.class);
        subquery.select(booking.get("room").get("roomId"))
                .where(
                        cb.equal(booking.get("room").get("roomId"), room.get("roomId")),
                        cb.lessThanOrEqualTo(booking.get("checkIn"), dateOut),
                        cb.greaterThanOrEqualTo(booking.get("checkOut"), dateIn)
                );

        // Join with RatingComments to get average rating and rating count
        Join<Room, RatingComments> ratingComments = room.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);

        // Predicates for filtering rooms based on search criteria
        Predicate stateLocationPredicate = cb.equal(room.get("stateLocation"), stateLocation);
        Predicate pricePredicate = cb.between(room.get("roomPrice"), minPrice, maxPrice);
        Predicate availablePredicate = cb.not(cb.exists(subquery));

        query.multiselect(
                        room,
                        cb.avg(ratingComments.get("rating")).alias("averageRating"),
                        cb.count(ratingComments.get("rating")).alias("ratingCount")
                ).where(
                        stateLocationPredicate,
                        pricePredicate,
                        availablePredicate
                ).groupBy(room.get("roomId"))
                .orderBy(cb.desc(room.get("roomPrice")));

        List<Object[]> results = entityManager.createQuery(query).getResultList();

        // Map results to Room entities
        List<Room> rooms = new ArrayList<>();
        for (Object[] result : results) {
            Room r = (Room) result[0];
            Double avgRating = (Double) result[1];
            Long count = (Long) result[2];

            if (avgRating != null) {
                avgRating = Math.round(avgRating * 10.0) / 10.0;
            }

            if (avgRating != null) {
                if (avgRating >= 4.2 && avgRating <= 5.0) {
                    r.setReviewTitle(ReviewTitle.EXCELLENT);
                } else if (avgRating >= 3.5 && avgRating < 4.2) {
                    r.setReviewTitle(ReviewTitle.VERY_GOOD);
                } else if (avgRating >= 3.0 && avgRating < 3.5) {
                    r.setReviewTitle(ReviewTitle.GOOD);
                }
            }

            r.setAverageRating(avgRating);
            r.setRatingCount(count);
            rooms.add(r);
        }
        return rooms;
    }


    @Override
    public List<Room> findRoomsByHighestRating(LocalDate dateIn, LocalDate dateOut, String stateLocation, double minPrice, double maxPrice) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<Room> room = query.from(Room.class);

        // Subquery to find rooms that are already booked for the given date range
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Booking> booking = subquery.from(Booking.class);
        subquery.select(booking.get("room").get("roomId"))
                .where(
                        cb.equal(booking.get("room").get("roomId"), room.get("roomId")),
                        cb.lessThanOrEqualTo(booking.get("checkIn"), dateOut),
                        cb.greaterThanOrEqualTo(booking.get("checkOut"), dateIn)
                );

        // Join with RatingComments to get average rating and rating count
        Join<Room, RatingComments> ratingComments = room.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);

        // Predicates for filtering rooms based on search criteria
        Predicate stateLocationPredicate = cb.equal(room.get("stateLocation"), stateLocation);
        Predicate pricePredicate = cb.between(room.get("roomPrice"), minPrice, maxPrice);
        Predicate availablePredicate = cb.not(cb.exists(subquery));

        query.multiselect(
                        room,
                        cb.avg(ratingComments.get("rating")).alias("averageRating"),
                        cb.count(ratingComments.get("rating")).alias("ratingCount")
                ).where(
                        stateLocationPredicate,
                        pricePredicate,
                        availablePredicate
                ).groupBy(room.get("roomId"))
                .having(cb.isNotNull(cb.avg(ratingComments.get("rating"))))
                .orderBy(cb.desc(cb.avg(ratingComments.get("rating"))));

        List<Object[]> results = entityManager.createQuery(query).getResultList();

        // Map results to Room entities
        List<Room> rooms = new ArrayList<>();
        for (Object[] result : results) {
            Room r = (Room) result[0];
            Double avgRating = (Double) result[1];
            Long count = (Long) result[2];

            if (avgRating != null) {
                avgRating = Math.round(avgRating * 10.0) / 10.0;

                if (avgRating >= 4.2 && avgRating <= 5.0) {
                    r.setReviewTitle(ReviewTitle.EXCELLENT);
                } else if (avgRating >= 3.5 && avgRating < 4.2) {
                    r.setReviewTitle(ReviewTitle.VERY_GOOD);
                } else if (avgRating >= 3.0 && avgRating < 3.5) {
                    r.setReviewTitle(ReviewTitle.GOOD);
                }

                r.setAverageRating(avgRating);
                r.setRatingCount(count);
                rooms.add(r);
            }
        }
        return rooms;
    }

    @Override
    public List<Room> findRoomsByStar(LocalDate dateIn, LocalDate dateOut, String stateLocation, double minPrice, double maxPrice, int stars) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<Room> room = query.from(Room.class);

        // Subquery to find rooms that are already booked for the given date range
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Booking> booking = subquery.from(Booking.class);
        subquery.select(booking.get("room").get("roomId"))
                .where(
                        cb.equal(booking.get("room").get("roomId"), room.get("roomId")),
                        cb.lessThanOrEqualTo(booking.get("checkIn"), dateOut),
                        cb.greaterThanOrEqualTo(booking.get("checkOut"), dateIn)
                );

        // Join with RatingComments to get average rating and rating count
        Join<Room, RatingComments> ratingComments = room.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);
        // Join with StarRating to get average star rating and star count
        Join<Room, StarRating> starRating = room.join("hotel", JoinType.LEFT).join("starRating", JoinType.LEFT);

        // Predicates for filtering rooms based on search criteria
        Predicate stateLocationPredicate = cb.equal(room.get("stateLocation"), stateLocation);
        Predicate pricePredicate = cb.between(room.get("roomPrice"), minPrice, maxPrice);
        Predicate availablePredicate = cb.not(cb.exists(subquery));

        query.multiselect(
                        room,
                        cb.avg(ratingComments.get("rating")).alias("averageRating"),
                        cb.count(ratingComments.get("rating")).alias("ratingCount"),
                        cb.avg(starRating.get("starNumber")).alias("averageStarRating"),
                        cb.count(starRating.get("starNumber")).alias("starCount")
                ).where(
                        stateLocationPredicate,
                        pricePredicate,
                        availablePredicate
                ).groupBy(room.get("roomId"))
                .having(cb.equal(cb.avg(starRating.get("starNumber")), stars))
                .orderBy(cb.desc(cb.avg(ratingComments.get("rating"))));

        List<Object[]> results = entityManager.createQuery(query).getResultList();

        // Map results to Room entities
        List<Room> rooms = new ArrayList<>();
        for (Object[] result : results) {
            Room r = (Room) result[0];
            Double avgRating = (Double) result[1];
            Long ratingCount = (Long) result[2];
            Double avgStarRating = (Double) result[3];
            Long starCount = (Long) result[4];

            if (avgRating != null) {
                avgRating = Math.round(avgRating * 10.0) / 10.0;
            }

            if (avgRating != null) {
                if (avgRating >= 4.2 && avgRating <= 5.0) {
                    r.setReviewTitle(ReviewTitle.EXCELLENT);
                } else if (avgRating >= 3.5 && avgRating < 4.2) {
                    r.setReviewTitle(ReviewTitle.VERY_GOOD);
                } else if (avgRating >= 3.0 && avgRating < 3.5) {
                    r.setReviewTitle(ReviewTitle.GOOD);
                }
            }

            r.setAverageRating(avgRating);
            r.setRatingCount(ratingCount);
//            r.setAverageStarRating(avgStarRating);
//            r.setStarCount(starCount);
            rooms.add(r);
        }
        return rooms;
    }


    @Override
    public List<Room> findRoomsByHotelNames(List<String> hotelNames, String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children, double minPrice, double maxPrice) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<Room> room = query.from(Room.class);

        // Subquery to find rooms that are already booked for the given date range
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Booking> booking = subquery.from(Booking.class);
        subquery.select(booking.get("room").get("roomId"))
                .where(
                        cb.equal(booking.get("room").get("roomId"), room.get("roomId")),
                        cb.lessThanOrEqualTo(booking.get("checkIn"), dateOut),
                        cb.greaterThanOrEqualTo(booking.get("checkOut"), dateIn)
                );

        // Join with RatingComments to get average rating and rating count
        Join<Room, RatingComments> ratingComments = room.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);

        // Predicates for filtering rooms based on search criteria
        Predicate hotelNamesPredicate = room.get("hotelName").in(hotelNames);
        Predicate stateLocationPredicate = cb.equal(room.get("stateLocation"), stateLocation);
        Predicate pricePredicate = cb.between(room.get("roomPrice"), minPrice, maxPrice);
        Predicate availablePredicate = cb.not(cb.exists(subquery));

        query.multiselect(
                room,
                cb.avg(ratingComments.get("rating")).alias("averageRating"),
                cb.count(ratingComments.get("rating")).alias("ratingCount")
        ).where(
                hotelNamesPredicate,
                stateLocationPredicate,
                pricePredicate,
                availablePredicate
        ).groupBy(room.get("roomId"));

        List<Object[]> results = entityManager.createQuery(query).getResultList();

        // Map results to Room entities
        List<Room> rooms = new ArrayList<>();
        for (Object[] result : results) {
            Room r = (Room) result[0];
            Double avgRating = (Double) result[1];
            Long count = (Long) result[2];

            if (avgRating != null) {
                avgRating = Math.round(avgRating * 10.0) / 10.0;
            }

            r.setAverageRating(avgRating);
            r.setRatingCount(count);
            rooms.add(r);
        }
        return rooms;
    }



    @Override
    public List<Room> findRoomsByUserRating( String stateLocation, LocalDate dateIn, LocalDate dateOut, int adults, int children, double minPrice, double maxPrice, String reviewTitle, double ratingNumber) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);
        Root<Room> roomRoot = query.from(Room.class);

        // Subquery to find rooms that are already booked for the given date range
        Subquery<Long> subquery = query.subquery(Long.class);
        Root<Booking> booking = subquery.from(Booking.class);
        subquery.select(booking.get("room").get("roomId"))
                .where(
                        cb.equal(booking.get("room"), roomRoot),
                        cb.or(
                                cb.and(
                                        cb.lessThan(booking.get("checkInTime"), LocalDateTime.of(dateOut, LocalTime.of(11, 0))),
                                        cb.greaterThan(booking.get("checkOutTime"), LocalDateTime.of(dateIn, LocalTime.of(11, 0)))
                                )
                        )
                );

        // Join with RatingComments to get average rating and rating count
        Join<Room, RatingComments> ratingComments = roomRoot.join("hotel", JoinType.LEFT).join("ratingComments", JoinType.LEFT);

        // Predicates for filtering rooms based on search criteria
        Predicate stateLocationPredicate = cb.equal(roomRoot.get("stateLocation"), stateLocation);
        Predicate pricePredicate = cb.between(roomRoot.get("roomPrice"), minPrice, maxPrice);
        Predicate availablePredicate = cb.not(cb.exists(subquery));

        query.multiselect(
                roomRoot,
                cb.avg(ratingComments.get("rating")).alias("averageRating"),
                cb.count(ratingComments.get("rating")).alias("ratingCount")
        ).where(
                stateLocationPredicate,
                pricePredicate,
                availablePredicate
        ).groupBy(roomRoot.get("roomId"));

        List<Object[]> results = entityManager.createQuery(query).getResultList();

        // Map results to Room entities and set averageRating and reviewTitle
        List<Room> rooms = new ArrayList<>();
        for (Object[] result : results) {
            Room room = (Room) result[0];
            Double avgRating = (Double) result[1];
            Long count = (Long) result[2];

            if (avgRating != null) {
                avgRating = Math.round(avgRating * 10.0) / 10.0;
            }

            if (avgRating != null) {
                if (avgRating >= 4.2 && avgRating <= 5.0) {
                    room.setReviewTitle(ReviewTitle.EXCELLENT);
                } else if (avgRating >= 3.5 && avgRating < 4.2) {
                    room.setReviewTitle(ReviewTitle.VERY_GOOD);
                } else if (avgRating >= 3.0 && avgRating < 3.5) {
                    room.setReviewTitle(ReviewTitle.GOOD);
                }
            } else {
                // Handle the case where avgRating is null
                room.setReviewTitle(ReviewTitle.NONE); // Assuming you have a NONE value for ReviewTitle
            }

            room.setAverageRating(avgRating != null ? avgRating : 0.0); // Set 0.0 if avgRating is null
            room.setRatingCount(count);
            rooms.add(room);
        }

        // Filter the rooms based on ratingNumber and reviewTitle after setting the fields
        return rooms.stream()
                .filter(r -> r.getAverageRating() >= ratingNumber)
                .filter(r -> r.getReviewTitle().name().equalsIgnoreCase(reviewTitle))
                .collect(Collectors.toList());
    }
}


