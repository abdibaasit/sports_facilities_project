package com.basitdev.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FacilityDTO {
    private Long id;
    private String facilityName;
    private String facilityType;
    private String facilityPhotoUrl;
    private String facilityDescription;
    private BigDecimal facilityPrice;
    private String location;
    private List<BookingDTO> bookings;
}
