// File: src/main/java/com/olx/repository/PhotoRepository.java
package com.olx.repository;

import com.olx.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoRepository extends JpaRepository<Photo, Long> {}