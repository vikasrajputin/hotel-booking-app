package com.auth.service.controller;

import com.auth.service.checkUser.CheckUser;
import com.auth.service.dto.LoginRequest;
import com.auth.service.dto.LoginResponse;
import com.auth.service.dto.RefreshTokenRequestDTO;
import com.auth.service.entity.UserData;
import com.auth.service.jwthelper.JwtService;
import com.auth.service.service.RefreshTokenService;


import com.auth.service.dto.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CheckUser checkUser;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        UserDetails userDetails;
        String userId;

        try {
            UserData userData = checkUser.loadUserDataByUsername(loginRequest.getEmail());
            userDetails = checkUser.loadUserByUsername(loginRequest.getEmail());
            userId = userData.getId();
            System.out.println("UserDetails: " + userDetails);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(loginRequest.getEmail());
        String accessToken = jwtService.generateToken(userDetails.getUsername(), userId);

        System.out.println("AccessToken: " + accessToken);
        System.out.println("RefreshToken: " + refreshToken);

        LoginResponse loginResponse = LoginResponse.builder()
                .accessToken(accessToken)
                .token(refreshToken.getToken())
                .userId(userId) // Add userId to the response
                .build();

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
        return refreshTokenService.findByToken(refreshTokenRequestDTO.getToken())
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {
                    String userEmail = refreshToken.getUserEmail();
                    UserData userData = checkUser.loadUserDataByUsername(userEmail);
                    UserDetails userDetails = checkUser.loadUserByUsername(userEmail);
                    String accessToken = jwtService.generateToken(userDetails.getUsername(), userData.getId());
                    LoginResponse loginResponse = LoginResponse.builder()
                            .accessToken(accessToken)
                            .token(refreshTokenRequestDTO.getToken())
                            .userId(userData.getId()) // Add userId to the response
                            .build();
                    return ResponseEntity.ok(loginResponse);
                }).orElseThrow(() -> new RuntimeException("Refresh Token is not in DB..!!"));
    }

    }



