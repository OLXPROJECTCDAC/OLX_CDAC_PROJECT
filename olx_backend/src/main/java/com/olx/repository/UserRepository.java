package com.olx.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.olx.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

	boolean existsByEmail(String email);

	boolean existsByMobileNumber(String mobileNumber);

	Optional<UserEntity> findByEmail(String email);

}
