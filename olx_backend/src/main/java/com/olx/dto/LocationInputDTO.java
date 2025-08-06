package com.olx.dto;

import com.olx.Enum.Area;
import jakarta.validation.constraints.NotNull;

public class LocationInputDTO {

    private String state = "Maharashtra";

    private String city = "Pune";

    @NotNull(message = "Area cannot be null")
    private Area area;

}
