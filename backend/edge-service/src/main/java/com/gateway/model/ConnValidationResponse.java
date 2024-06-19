package com.gateway.model;

import lombok.*;

import java.util.List;

@Data
public class ConnValidationResponse {
    private String status;
    private boolean isAuthenticated;
    private String methodType;
    private String username;
    private List<Authorities> authorities;
}