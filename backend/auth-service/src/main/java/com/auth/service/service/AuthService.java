package com.auth.service.service;

import com.auth.service.dto.RegisterRequest;

public interface AuthService {


    boolean registerUser(RegisterRequest registerRequest);

    public void delete(String id);
}
