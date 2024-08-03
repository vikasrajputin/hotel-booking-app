package com.hotel.service.Configuration;

import com.hotel.service.entity.UserData;
import com.hotel.service.respository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
public class CheckUser implements UserDetailsService {

    @Autowired
    private UserRespository userRespository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // write Logic to fetch  user data  from database

        UserData user = userRespository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Not Found Email " + email));

        return new User(user.getEmail(), user.getPassword(), Collections.emptyList());

    }
}