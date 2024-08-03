package com.auth.service.service;

import com.auth.service.Status.Status;
import com.auth.service.dto.RegisterRequest;
import com.auth.service.entity.UserData;
import com.auth.service.respository.UserRespository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    private UserRespository userRespository;


    @Autowired
    private PasswordEncoder passwordEncoder;





    @Override
    public boolean registerUser(RegisterRequest registerRequest) {
        logger.info("Register request received for email: {}", registerRequest.getEmail());

        if(userRespository.existsByEmail(registerRequest.getEmail())) {
            logger.warn("Email already exists: {}", registerRequest.getEmail());
            return false;
        }

        UserData user = new UserData();
        BeanUtils.copyProperties(registerRequest,user);

        LocalDateTime time = LocalDateTime.now();


//        String newUUID = UUID.randomUUID();
//        logger.info("Generated UUID: {}", newUUID);
//        user.setId(newUUID);
        user.setId(UUID.randomUUID().toString().replace("-", ""));
        user.setCreatedDate(Date.from(time.atZone(ZoneId.systemDefault()).toInstant()));
        user.setModifiedBy(Date.from(time.atZone(ZoneId.systemDefault()).toInstant()));
       String hashPassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(hashPassword);
        user.setCreatedBy("ADMIN");
        user.setStatus(Status.ACTIVE);

//        userRespository.save(user);
//        System.out.println(user);
//        logger.info("User registered successfully: {}", user);
//        return true;


        try {
            userRespository.save(user);
            logger.info("User registered successfully: {}", user);
            return true;
        } catch (Exception ex) {
            logger.error("Error saving user: {}", ex.getMessage());
            return false;
        }
    }




    @Override
    public void delete(String id) {
        if(!userRespository.existsById(id)){

            throw new EntityNotFoundException("Employee with id "+id+"not found");
        }

        userRespository.deleteAllById(Collections.singleton(id));
    }


}
