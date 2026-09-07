package com.basitdev.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "facilities")
public class Facility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String facilityName;
    private String facilityType;
    private String facilityPhotoUrl;
    private String facilityDescription;
    private BigDecimal facilityPrice;
    private String location;
    @OneToMany(mappedBy = "facility", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Booking> bookings=new ArrayList<>();

    @Override
    public String toString() {
        return "Facility{" +
                "id=" + id +
                ", facilityName='" + facilityName + '\'' +
                ", facilityType='" + facilityType + '\'' +
                ", facilityPhotoUrl='" + facilityPhotoUrl + '\'' +
                ", facilityDescription='" + facilityDescription + '\'' +
                ", facilityPrice='" + facilityPrice + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
