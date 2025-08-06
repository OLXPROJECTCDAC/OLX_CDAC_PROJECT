// File: src/main/java/com/olx/service/LocationService.java
package com.olx.service;

import com.olx.dto.LocationDto;
import java.util.List;

public interface LocationService {
    List<LocationDto> getAllLocations();
    LocationDto getLocationById(Long id);
    LocationDto createLocation(LocationDto dto);
    LocationDto updateLocation(Long id, LocationDto dto);
    void deleteLocation(Long id);
}