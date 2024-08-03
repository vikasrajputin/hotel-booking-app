package com.auth.service.dto;


import lombok.Data;

@Data

public class HomeResponse {
    private String message;

    public HomeResponse(String message) {
        this.message=message;
    }
}
