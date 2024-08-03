package com.hotel.service.service;


import com.hotel.service.Status.RoomType;
import com.hotel.service.dto.HotelDetailDTO;
import com.hotel.service.entity.HotelDetails;
import com.hotel.service.entity.HotelImagePath;
import com.hotel.service.entity.HotelImages;
import com.hotel.service.exception.NotFoundException;
import com.hotel.service.respository.HotelImagePathRepository;
import com.hotel.service.respository.HotelImagesRepository;
import com.hotel.service.respository.HotelRepository;
import com.hotel.service.respository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;



@Service
public class ImagesService {

    private static final String UPLOAD_DIR = "E:\\BookMyTripImages";


    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private HotelImagesRepository hotelImagesRepository;
    @Autowired
    private HotelImagePathRepository hotelImagePathRepository;

    public void saveHotelImages(HotelImages hotelImages) {
        hotelImagesRepository.save(hotelImages);
    }

    public List<HotelImages> getHotelImagesByHotelId(Long hotelId) {
        return hotelImagesRepository.findByHotelId(hotelId);
    }


    public HotelImages findByHotelIdAndRoomType(Long hotelId, RoomType roomType) {
        return hotelImagesRepository.findByHotelIdAndRoomType(hotelId, roomType);
    }


    public HotelImagePath findImagePathById(Long id) {
        return hotelImagePathRepository.findById(id).orElse(null);
    }

    public void updateImagePath(HotelImagePath hotelImagePath) {
        hotelImagePathRepository.save(hotelImagePath);
    }

//    public void updateHotelImages(Long hotelId, RoomType roomType, List<HotelImagePath> newImagePaths) {
//        HotelImages hotelImages = hotelImagesRepository.findByHotelIdAndRoomType(hotelId, roomType);
//        if (hotelImages != null) {
//            // Clear existing images and add new ones
//            hotelImages.getRoomImages().clear();
//            for (HotelImagePath newImagePath : newImagePaths) {
//                newImagePath.setHotelImages(hotelImages);
//                hotelImages.getRoomImages().add(newImagePath);
//            }
//            hotelImagesRepository.save(hotelImages);
//        } else {
//            throw new NotFoundException("Hotel ID or Room Type not found");
//        }
//    }







    public void deleteHotelImage(Long hotelId, RoomType roomType, Long imageId) {
        HotelImages hotelImages = hotelImagesRepository.findByHotelIdAndRoomType(hotelId, roomType);
        if (hotelImages != null) {
            HotelImagePath imageToRemove = null;
            for (HotelImagePath imagePath : hotelImages.getRoomImages()) {
                if (imagePath.getId().equals(imageId)) {
                    imageToRemove = imagePath;
                    break;
                }
            }

            if (imageToRemove != null) {
                String roomDir = "hotel/" + hotelId + "/photo/" + roomType.toString().toLowerCase();
                Path roomUploadPath = Paths.get(UPLOAD_DIR).resolve(roomDir);
                Path filePath = roomUploadPath.resolve(imageToRemove.getImagePath());

                // Delete the image file from the directory
                try {
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to delete image file: " + imageToRemove.getImagePath(), e);
                }

                // Remove the image path from the database
                hotelImages.getRoomImages().remove(imageToRemove);
                hotelImagesRepository.save(hotelImages);
            } else {
                throw new NotFoundException("Image not found");
            }
        } else {
            throw new NotFoundException("Hotel ID or Room Type not found");
        }

    }
    public List<String> getImagesByHotelIdAndRoomType(Long hotelId, RoomType roomType) throws IOException {
        HotelImages hotelImages = findByHotelIdAndRoomType(hotelId, roomType);
        if (hotelImages == null) {
            throw new NotFoundException("Images not found for hotel ID " + hotelId + " and room type " + roomType);
        }

        List<String> base64ImageList = new ArrayList<>();
        for (HotelImagePath imagePath : hotelImages.getRoomImages()) {
            Path imageFilePath = Paths.get(UPLOAD_DIR).resolve("hotel/" + hotelId + "/photo/" + roomType.toString().toLowerCase()).resolve(imagePath.getImagePath());
            byte[] imageBytes = Files.readAllBytes(imageFilePath);
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            base64ImageList.add(base64Image);
        }

        return base64ImageList;
    }



}
