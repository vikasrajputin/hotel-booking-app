package com.auth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

public class RefreshTokenResponse {

    private String token;
    public RefreshTokenResponse() {
    }
    public RefreshTokenResponse(String token){

        this.token=token;
    }
}
