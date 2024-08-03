package com.auth.service.respository;

import com.auth.service.dto.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Integer>  {
    Optional<RefreshToken> findByToken(String token);
}
