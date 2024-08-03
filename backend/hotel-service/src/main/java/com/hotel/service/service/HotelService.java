package com.hotel.service.service;


import com.hotel.service.dto.HotelDetailDTO;
import com.hotel.service.dto.RoomDTO;
import com.hotel.service.entity.HotelDetails;
import com.hotel.service.entity.HotelImages;
import com.hotel.service.entity.Room;
import com.hotel.service.exception.NotFoundException;
import com.hotel.service.respository.HotelImagesRepository;
import com.hotel.service.respository.HotelRepository;
import com.hotel.service.respository.RoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HotelService {


    @Autowired
    private HotelRepository hotelRepository;


    @Autowired
    private RoomRepository roomRepository;






    public HotelDetailDTO addHotel(HotelDetails hotel) {
        HotelDetails savedHotel = hotelRepository.save(hotel);
        return convertToDTO(savedHotel);
    }

    public List<HotelDetailDTO> getAllDetails() {
        List<HotelDetails> hotels = hotelRepository.findAll();
        return hotels.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public HotelDetailDTO getHotelByID(Long hotelId){
        HotelDetails hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new NotFoundException("Hotel not found with id: " + hotelId));
        return convertToDTO(hotel);
    }

    public HotelDetailDTO updateHotel(Long hotelId, HotelDetails hotelDetails){
        Optional<HotelDetails> hotelUpdate = hotelRepository.findById(hotelId);
        if (hotelUpdate.isPresent()) {
            HotelDetails update = hotelUpdate.get();

            if (hotelDetails.getHotelName() != null) {
                update.setHotelName(hotelDetails.getHotelName());
            }
            if(hotelDetails.getCityLocation() != null) {
                update.setCityLocation(hotelDetails.getCityLocation());
            }
            if(hotelDetails.getStateLocation() !=null){
                update.setStateLocation(hotelDetails.getStateLocation());
            }
            if(hotelDetails.getNearplace() !=null) {
                update.setNearplace(hotelDetails.getNearplace());
            }
            if(hotelDetails.getTotalRoom() !=null) {
                update.setTotalRoom(hotelDetails.getTotalRoom());
            }
            if(hotelDetails.getStatus() !=null) {
                update.setStatus(hotelDetails.getStatus());
            }

            HotelDetails updatedHotel = hotelRepository.save(update);
            return convertToDTO(updatedHotel);
        }
        else {
            throw new NotFoundException("Hotel with ID " + hotelId + " not found");
        }
    }

    public void deleteHotel(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new EntityNotFoundException("Hotel with id " + id + " not found");
        }
        hotelRepository.deleteById(id);
    }

    private HotelDetailDTO convertToDTO(HotelDetails hotel) {
        HotelDetailDTO hotelDTO = new HotelDetailDTO();
        hotelDTO.setId(hotel.getId());
        hotelDTO.setStateLocation(hotel.getStateLocation());
        hotelDTO.setHotelName(hotel.getHotelName());
        hotelDTO.setCityLocation(hotel.getCityLocation());
        hotelDTO.setNearplace(hotel.getNearplace());
        hotelDTO.setTotalRoom(hotel.getTotalRoom());
        hotelDTO.setStatus(hotel.getStatus());
        return hotelDTO;
    }






//    public List<RoomDTO> findHotels(String stateLocation, Integer adults, Integer children, Double minPrice, Double maxPrice, LocalDate checkIn, LocalDate checkOut) {
//        List<Object[]> results = roomRepository.findHotelsWithAverageRating(stateLocation, adults, children, minPrice, maxPrice, checkIn, checkOut);
//        return results.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    private RoomDTO convertToDTO(Object[] result) {
//        Room room = (Room) result[0];
//        Double averageRating = (Double) result[1];
//        Long  rating = (Long) result[2];
//
//        return new RoomDTO(
//                room.getRoomId(),
//                room.getRoomType(),
//                room.getRoomNumber(),
//                room.getRoomPrice(),
//                room.getAdults(),
//                room.getChildren(),
//                room.getRoomDescription(),
//                room.getHotelName(),
//                room.getCityLocation(),
//                room.getStateLocation(),
//                room.getRoomImages(),
//                  averageRating,
//                   rating
//        );













    }

