// File: src/main/java/com/olx/controller/LocationController.java
package com.olx.controller;

import com.olx.dto.LocationDto;
import com.olx.service.LocationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    private final LocationService service;
    public LocationController(LocationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<LocationDto>> getAll() {
        return ResponseEntity.ok(service.getAllLocations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getLocationById(id));
    }

    @PostMapping
    public ResponseEntity<LocationDto> create(@Valid @RequestBody LocationDto dto) {
        return ResponseEntity.status(201).body(service.createLocation(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationDto> update(
        @PathVariable Long id,
        @Valid @RequestBody LocationDto dto) {
        return ResponseEntity.ok(service.updateLocation(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}