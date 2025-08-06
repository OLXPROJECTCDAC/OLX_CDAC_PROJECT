// File: src/main/java/com/olx/repository/LocationRepository.java
package com.olx.repository;

import com.olx.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
}