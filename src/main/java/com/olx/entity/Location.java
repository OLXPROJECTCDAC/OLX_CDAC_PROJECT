// File: src/main/java/com/olx/entity/Location.java
package com.olx.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "City must not be blank")
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String city;

    @Size(max = 100)
    private String state;

    @NotBlank(message = "Country must not be blank")
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String country;

    // Constructors, getters, setters
    public Location() {}
    public Location(String city, String state, String country) {
        this.city = city;
        this.state = state;
        this.country = country;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
}