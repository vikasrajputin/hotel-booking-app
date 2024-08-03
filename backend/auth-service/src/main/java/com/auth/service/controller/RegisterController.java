package com.auth.service.controller;


import com.auth.service.dto.RegisterRequest;
import com.auth.service.respository.UserRespository;
import com.auth.service.service.AuthService;
import com.auth.service.dto.ReqisterResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RegisterController {


@Autowired
private UserRespository userRespository;

@Autowired
private AuthService authService;

@PostMapping("/register")
public ResponseEntity<?> resgister(@RequestBody RegisterRequest registerRequest){

    boolean register = authService.registerUser(registerRequest);

    if(register){

        ReqisterResponse response = new ReqisterResponse("Register is Successful.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
//        return new ResponseEntity<>("Employee with id deleted sucessfully", HttpStatus.OK);
    }

    else {
        // Create a response object with a message
        ReqisterResponse response = new ReqisterResponse("Failed to register. Please try again.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

}
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        try {

            authService.delete(id);
            return new ResponseEntity<>("Employee with id "+id+" deleted sucessfully", HttpStatus.OK);
        } catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage() , HttpStatus.NOT_FOUND);
        }


    }


}
