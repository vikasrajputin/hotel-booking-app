package com.hotel.service.controller;

import com.hotel.service.Status.RoomType;
import com.hotel.service.dto.ImagesResponse;
import com.hotel.service.entity.HotelDetails;
import com.hotel.service.entity.HotelImagePath;
import com.hotel.service.entity.HotelImages;
import com.hotel.service.exception.NotFoundException;
import com.hotel.service.service.HotelService;
import com.hotel.service.service.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ImagesController {



    private static final String UPLOAD_DIR = "E:\\BookMyTripImages";



    @Autowired
    private ImagesService imagesService;

    @PostMapping("hotel/{hotelId}/images/{status}")
    public ResponseEntity<ImagesResponse> uploadRoomImages(@PathVariable Long hotelId, @PathVariable RoomType status,
                                                           @RequestParam("roomImages") List<MultipartFile> roomImages) throws IOException {

        String roomDir = "hotel/" + hotelId + "/photo/" + status.toString().toLowerCase();
        Path roomUploadPath = Paths.get(UPLOAD_DIR).resolve(roomDir);
        Files.createDirectories(roomUploadPath);

        // Check if a HotelImages entity already exists for the given hotelId and status (room type)
        HotelImages hotelImages = imagesService.findByHotelIdAndRoomType(hotelId, status);
        List<HotelImagePath> roomImagePaths;

        if (hotelImages == null) {
            // If no existing entity, create a new one
            hotelImages = new HotelImages();
            hotelImages.setHotelId(hotelId);
            hotelImages.setRoomType(status);
            roomImagePaths = new ArrayList<>();
            hotelImages.setRoomImages(roomImagePaths);
        } else {
            // If existing entity found, retrieve the existing roomImagePaths
            roomImagePaths = hotelImages.getRoomImages();
        }

        for (MultipartFile image : roomImages) {
            if (!image.isEmpty()) {
                String fileName = image.getOriginalFilename();
                Path filePath = roomUploadPath.resolve(fileName);
                image.transferTo(filePath.toFile());

                // Log the file path
                System.out.println("Hotel image saved to: " + filePath.toString());

                HotelImagePath hotelImagePath = new HotelImagePath();
                hotelImagePath.setHotelImages(hotelImages);
                hotelImagePath.setImagePath(fileName);
                roomImagePaths.add(hotelImagePath);
            }
        }

        imagesService.saveHotelImages(hotelImages);

        ImagesResponse response = new ImagesResponse("Images uploaded successfully to: " + roomDir);
        return ResponseEntity.ok(response);

    }



    @PutMapping("hotel/{hotelId}/images/{status}/{imagesId}")
    public ResponseEntity<ImagesResponse> updateImage(@PathVariable Long hotelId, @PathVariable RoomType status, @PathVariable Long imagesId,
                                              @RequestParam("roomImage") MultipartFile roomImage) throws IOException {

        String roomDir = "hotel/" + hotelId + "/photo/" + status.toString().toLowerCase();
        Path roomUploadPath = Paths.get(UPLOAD_DIR).resolve(roomDir);
        Files.createDirectories(roomUploadPath);


        HotelImagePath hotelImagePath = imagesService.findImagePathById(imagesId);
        if (hotelImagePath == null) {
            ImagesResponse response = new ImagesResponse("Image with id " + imagesId + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Check if the hotelId and RoomType match the hotel_images_id
        HotelImages hotelImages = hotelImagePath.getHotelImages();
        if (!hotelImages.getHotelId().equals(hotelId) || !hotelImages.getRoomType().equals(status)) {
            ImagesResponse response = new ImagesResponse("Hotel ID and Room Type do not match the provided image ID");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }


        // Delete the old image file from the directory
        String oldFileName = hotelImagePath.getImagePath();
        Path oldFilePath = roomUploadPath.resolve(oldFileName);
        Files.deleteIfExists(oldFilePath);

        // Save the new image file
        String newFileName = roomImage.getOriginalFilename();
        Path newFilePath = roomUploadPath.resolve(newFileName);
        roomImage.transferTo(newFilePath.toFile());

        // Log the file path
        System.out.println("Hotel image updated to: " + newFilePath.toString());

        // Update image path in the entity
        hotelImagePath.setImagePath(newFileName);
        imagesService.updateImagePath(hotelImagePath);

        ImagesResponse response = new ImagesResponse("Images updated successfully to: " + roomDir);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/hotel/{hotelId}/images")
    public ResponseEntity<Map<RoomType, List<String>>> getImages(@PathVariable Long hotelId) {
        try {
            List<HotelImages> hotelImagesList = imagesService.getHotelImagesByHotelId(hotelId);
            if (hotelImagesList == null || hotelImagesList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            Map<RoomType, List<String>> base64ImageMap = new HashMap<>();
            for (HotelImages hotelImages : hotelImagesList) {
                List<String> base64ImageList = new ArrayList<>();
                for (HotelImagePath imagePath : hotelImages.getRoomImages()) {
                    Path imageFilePath = Paths.get(UPLOAD_DIR).resolve("hotel/" + hotelId + "/photo/" + hotelImages.getRoomType().toString().toLowerCase()).resolve(imagePath.getImagePath());
                    byte[] imageBytes = Files.readAllBytes(imageFilePath);
                    String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                    base64ImageList.add(base64Image);
                }
                base64ImageMap.put(hotelImages.getRoomType(), base64ImageList);
            }

            return ResponseEntity.ok().body(base64ImageMap);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/hotel/{hotelId}/images/{roomType}")
    public ResponseEntity<List<String>> getImagesByHotelIdAndRoomType(@PathVariable Long hotelId, @PathVariable RoomType roomType) {
        try {
            List<String> base64ImageList = imagesService.getImagesByHotelIdAndRoomType(hotelId, roomType);
            return ResponseEntity.ok(base64ImageList);
        } catch (NotFoundException e) {
            ImagesResponse response = new ImagesResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IOException e) {
            e.printStackTrace();
            ImagesResponse response = new ImagesResponse("An error occurred while retrieving the images");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @DeleteMapping("/hotel/{hotelId}/images/{status}/{imageId}")
    public ResponseEntity<ImagesResponse> deleteImage(@PathVariable Long hotelId, @PathVariable RoomType status,
                                                      @PathVariable Long imageId) {
        try {
            imagesService.deleteHotelImage(hotelId, status, imageId);
            ImagesResponse response = new ImagesResponse("Image deleted successfully");
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            ImagesResponse response = new ImagesResponse(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            ImagesResponse response = new ImagesResponse("An error occurred while deleting the image");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }







}
