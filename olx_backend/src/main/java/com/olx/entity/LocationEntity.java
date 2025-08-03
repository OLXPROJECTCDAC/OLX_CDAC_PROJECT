package com.olx.entity;

import com.olx.Enum.Area;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "locations",

indexes = {
        @Index(name = "idx_locations_city", columnList = "city"),
        @Index(name = "idx_locations_area", columnList = "area"),
        @Index(name = "idx_locations_area", columnList = "state")
    }
		)
@Getter
@Setter
@ToString
public class LocationEntity extends BaseEntity {

    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(name = "area", nullable = false, length = 150)
    private Area area;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;

    @Min(-90)
    @Max(+90)
    @Column(name = "latitude")
    private Double latitude;

    @Min(-180)
    @Max(+180)
    @Column(name = "longitude")
    private Double longitude;
}
