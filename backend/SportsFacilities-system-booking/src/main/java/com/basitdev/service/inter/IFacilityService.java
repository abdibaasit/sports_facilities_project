package com.basitdev.service.inter;

import com.basitdev.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public interface IFacilityService {
    Response addNewFacility(MultipartFile photo, String facilityType, BigDecimal facilityPrice, String facilityDescription,String facilityName, String location);
    List<String> getAllFacilityTypes();
    Response getAllFacilities();
    Response deleteFacility(Long facilityId);
    Response updateFacility(Long facilityId, String facilityDescription, String facilityType, BigDecimal facilityPrice, MultipartFile photo, String facilityName,String location);
    Response getFacilityById(Long facilityId);
    Response findAvailableFacilitiesByTimeTypeAndDay(LocalTime startTime, LocalTime endTime, String facilityType, DayOfWeek dayOfWeek);
    Response getAllAvailableFacilities();
}
