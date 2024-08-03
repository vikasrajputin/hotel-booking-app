package com.book.my.trip.service;

import com.book.my.trip.Status.PaymentStatus;
import com.book.my.trip.dto.*;
import com.book.my.trip.entity.*;
import com.book.my.trip.exception.NotFoundException;
import com.book.my.trip.repository.BookIngRepository;
import com.book.my.trip.repository.HotelRepository;
import com.book.my.trip.repository.RoomRepository;
import com.book.my.trip.repository.UserRespository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private BookIngRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRespository userRespository;






    @Transactional
    public BookingDTO  saveBooking(Long hotelId, Long roomId, String userId, Booking booking) {

        // Find the hotel by ID or throw NotFoundException if not found
        HotelDetails hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new NotFoundException("Hotel not found with id: " + hotelId));

        // Find the room by ID from booking or throw NotFoundException if not found
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundException("Room not found with id: " + roomId));

        UserData user = userRespository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id:  " + userId));


//        LocalDate dateIn = booking.getCheckInDate();
//        LocalDate dateOut =booking.getCheckOutDate();


        if (!room.getHotel().getId().equals(hotelId)) {
            throw new IllegalArgumentException("Room with id " + room.getRoomId() + " does not belong to hotel with id " + hotelId);
        }


        // Check if the room is available for the given dates
        List<Booking> conflictingBookings = bookingRepository.findByRoomAndCheckInBeforeAndCheckOutAfter(room, booking.getCheckIn(), booking.getCheckOut());
        if (!conflictingBookings.isEmpty()) {
            throw new RuntimeException("Room is not available for the selected dates");
        }


        if (room.getStatus().equals(Status.BOOKED)) {
            throw new RuntimeException("Room is already booked");
        }


        booking.setHotel(hotel);
        booking.setHotelName(hotel.getHotelName());
        booking.setCityLocation(hotel.getCityLocation());
        booking.setStateLocation(hotel.getStateLocation());

        booking.setPrice(room.getRoomPrice());

        booking.setUserId(userId);
        String userName = user.getFirstName() + " " + user.getLastName();
        booking.setUserName(userName);
        booking.setUserEmail(user.getEmail());

        LocalDateTime time = LocalDateTime.now();
        booking.setBookingDate(Date.from(time.atZone(ZoneId.systemDefault()).toInstant()));

        booking.setPaymentOption(booking.getPaymentOption());
        booking.setCheckIn(booking.getCheckIn());
        booking.setCheckOut(booking.getCheckOut());
        booking.setCheckInTime(booking.getCheckInTime());
        booking.setCheckOutTime(booking.getCheckOutTime());
        // Set the room in the booking
        booking.setRoom(room);


        long totalRow = roomRepository.countAvailableRooms(hotelId, room.getStatus());

        if (totalRow == 1) {
            hotel.setStatus(Status.BOOKED);
            hotelRepository.save(hotel);
        }

        room.setStatus(Status.BOOKED);
        roomRepository.save(room);

        // Set the booking reference in each GuestInfo entity
        if (booking.getGuestInfos() != null) {
            for (GuestInfo guestInfo : booking.getGuestInfos()) {
                guestInfo.setBooking(booking);
            }
        }

        // Save the booking and guestInfos in the same transaction
        booking.setPaymentStatus(PaymentStatus.COMPLETED);
        booking = bookingRepository.save(booking);

//        String message = String.format("Hi %s, you have booked %s from %s to %s.", userName, hotel.getHotelName(), booking.getCheckIn().toString(), booking.getCheckOut().toString());

        return convertToDto(booking);

    }


    public BookingDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found with id:" + bookingId));
        return convertToDto(booking);
    }

    public List<BookingDTO> getAllBooking() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(this::convertToDto).collect(Collectors.toList());
    }


    public UserInfoDTO getUserInfo(String userId) {
        return userRespository.findById(userId)
                .map(user -> {
                    UserInfoDTO dto = new UserInfoDTO();
                    dto.setUserNames(user.getFirstName() + " " + user.getLastName());
                    dto.setUserEmail(user.getEmail());
                    return dto;
                })
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
    }

    private BookingDTO convertToDto(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setBookingId(booking.getBookingId());
        bookingDTO.setHotelId(booking.getHotel().getId());
        bookingDTO.setRoomId(booking.getRoom().getRoomId());
        bookingDTO.setUserId(booking.getUserId());
        bookingDTO.setHotelName(booking.getHotelName());
        bookingDTO.setCityLocation(booking.getCityLocation());
        bookingDTO.setStateLocation(booking.getStateLocation());
        bookingDTO.setPrice(booking.getPrice());
        bookingDTO.setCheckIn(booking.getCheckIn());
        bookingDTO.setCheckOut(booking.getCheckOut());
        bookingDTO.setUserName(booking.getUserName());
        bookingDTO.setUserEmail(booking.getUserEmail());
        bookingDTO.setPaymentOption(booking.getPaymentOption());
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setPaymentStatus(booking.getPaymentStatus());
        bookingDTO.setGuestInfo(booking.getGuestInfos());
        return bookingDTO;
    }

    public TotalAmountRep calculatePrice(TotalAmountReq request) {
        // Calculate the total number of days
        long totalDays = ChronoUnit.DAYS.between(request.getCheckInTime(), request.getCheckOutTime());

        // Calculate the total room price (totalDays * totalPrice * totalRoom)
        long totalDayRoomPriceCount = (long) (totalDays *  request.getTotalPrice());

        // Calculate the total discount (20% of the totalDayRoomPriceCount)
        long totalDiscount = (long) (totalDayRoomPriceCount * 0.20);

        // Calculate the price after discount
        long priceAfterDiscount = totalDayRoomPriceCount - totalDiscount;

        // Calculate the taxes (10% of the priceAfterDiscount)
        long taxesAdd = (long) (priceAfterDiscount * 0.10);

        // Calculate the final price
        long finalPrice = priceAfterDiscount + taxesAdd;

        // Create the response object
        TotalAmountRep response = new TotalAmountRep();
        response.setTotalDay(totalDays);
        response.setTotalDayRoomPriceCount(totalDayRoomPriceCount);
        response.setTotalDiscount(totalDiscount);
        response.setPriceAfterDiscount(priceAfterDiscount);
        response.setTaxesAdd(taxesAdd);
        response.setFinalPrice(finalPrice);

        return response;
    }










    public List<UserBookedHistoryDTO> getUserBookingsByDateRange(String userId, int startMonth, int endMonth, int year) {
        List<Booking> bookings = bookingRepository.findBookingsByUserIdAndDateRange(userId, startMonth, endMonth, year);
        return mapBookingsToDTOs(bookings);
    }

    public List<UserBookedHistoryDTO> getUserBookingsHistory(String userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return mapBookingsToDTOs(bookings);
    }

    private List<UserBookedHistoryDTO> mapBookingsToDTOs(List<Booking> bookings) {
        List<UserBookedHistoryDTO> dtos = new ArrayList<>();
        for (Booking booking : bookings) {
            UserBookedHistoryDTO dto = new UserBookedHistoryDTO();
            dto.setHotelName(booking.getHotelName());
            dto.setGuestInfos(booking.getGuestInfos());
            dto.setCheckInDate(booking.getCheckIn());
            dto.setCheckOutDate(booking.getCheckOut());
            dto.setNumofAdults(booking.getNumOfAdults());
            dto.setNumofChildren(booking.getNumOfChildren());
            dto.setRoomNumber(booking.getRoom().getRoomNumber());
            dto.setPrice(booking.getPrice());
            dto.setCityLocation(booking.getCityLocation());
            dto.setUserEmail(booking.getUserEmail());
            dto.setStateLocation(booking.getStateLocation());
            // Fetch user details based on userId
            UserData user = userRespository.findById(booking.getUserId())
                    .orElseThrow(() -> new NotFoundException("User not found with id: " + booking.getUserId()));

            dto.setUserName(user.getFirstName() + " " + user.getLastName());
            dtos.add(dto);
        }
        return dtos;
    }









public String cancelBooking(Long bookingId) {
    Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new NotFoundException("Booking not found with id: " + bookingId));
    HotelDetails hotel =booking.getHotel();
    Room room = booking.getRoom();



    long totalRow = roomRepository.countAvailableRooms(hotel.getId(), room.getStatus());

    if (totalRow == 1) {
        hotel.setStatus(Status.AVAILABLE);
        hotelRepository.save(hotel);
        System.out.println(totalRow);
    }

    if (room.getStatus().equals(Status.AVAILABLE)) {
        return "ROOM ALREADY AVAILABLE";
    }

    room.setStatus(Status.AVAILABLE);
    roomRepository.save(room);


//    // Optional: Mark booking as canceled, if desired
     bookingRepository.delete(booking);
//     bookingRepository.save(booking);

    return "Booking cancelled successfully and room status updated to AVAILABLE";
}

}

