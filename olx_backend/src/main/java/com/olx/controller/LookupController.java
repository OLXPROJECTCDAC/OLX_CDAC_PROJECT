package com.olx.controller;

import com.olx.Enum.Area;
import com.olx.dto.AreaDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/lookup")
public class LookupController {
    @GetMapping("/areas")
    public ResponseEntity<List<AreaDTO>> getAllAreas() {
        List<AreaDTO> areas = Arrays.stream(Area.values())
                .map(area -> new AreaDTO(
                        area.name(),          // The enum constant (e.g., "PUNE_CITY")
                        formatAreaName(area)  // The user-friendly name (e.g., "Pune City")
                ))
                .toList();

        return ResponseEntity.ok(areas);
    }

    private String formatAreaName(Area area) {
        String[] words = area.name().toLowerCase().split("_");
        return Arrays.stream(words)
                .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1))
                .collect(Collectors.joining(" "));
    }
}