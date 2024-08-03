package com.auth.service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String token;
    private String userId; // Add userId field

    public LoginResponse(String accessToken, String token, String userId){
        this.accessToken = accessToken;
        this.token = token;
        this.userId = userId; // Initialize userId
    }
}
