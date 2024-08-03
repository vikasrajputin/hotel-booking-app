package com.auth.service.controller;


import com.auth.service.dto.HomeResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {


    @GetMapping("/home")
    public HomeResponse hello(){
        return new HomeResponse("Hello from Authorized API request.");
    }
}
