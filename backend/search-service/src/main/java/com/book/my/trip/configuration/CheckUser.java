package com.book.my.trip.configuration;


import com.book.my.trip.entity.UserData;
import com.book.my.trip.repository.UserRespository;
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