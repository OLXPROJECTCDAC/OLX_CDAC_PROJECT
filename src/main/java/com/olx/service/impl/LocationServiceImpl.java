// File: src/main/java/com/olx/service/impl/LocationServiceImpl.java
package com.olx.service.impl;

import com.olx.dto.LocationDto;
import com.olx.entity.Location;
import com.olx.repository.LocationRepository;
import com.olx.service.LocationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {
    private final LocationRepository repo;
    public LocationServiceImpl(LocationRepository repo) {
        this.repo = repo;
    }

    private LocationDto toDto(Location loc) {
        LocationDto dto = new LocationDto();
        dto.setId(loc.getId());
        dto.setCity(loc.getCity());
        dto.setState(loc.getState());
        dto.setCountry(loc.getCountry());
        return dto;
    }

    @Override
    public List<LocationDto> getAllLocations() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public LocationDto getLocationById(Long id) {
        Location loc = repo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Location not found: " + id));
        return toDto(loc);
    }

    @Override
    public LocationDto createLocation(LocationDto dto) {
        Location saved = repo.save(new Location(dto.getCity(), dto.getState(), dto.getCountry()));
        return toDto(saved);
    }

    @Override
    public LocationDto updateLocation(Long id, LocationDto dto) {
        Location loc = repo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Location not found: " + id));
        loc.setCity(dto.getCity());
        loc.setState(dto.getState());
        loc.setCountry(dto.getCountry());
        return toDto(repo.save(loc));
    }

    @Override
    public void deleteLocation(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Location not found: " + id);
        }
        repo.deleteById(id);
    }
}