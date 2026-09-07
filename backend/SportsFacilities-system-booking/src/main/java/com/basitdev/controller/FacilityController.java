package com.basitdev.controller;

import com.basitdev.dto.Response;
import com.basitdev.service.inter.IFacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/facilities")
public class FacilityController {

    @Autowired
    private IFacilityService facilityService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewFacility(
            @RequestParam(value = "facilityName", required = false) String facilityName,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "facilityType", required = false) String facilityType,
            @RequestParam(value = "facilityPrice", required = false) BigDecimal facilityPrice,
            @RequestParam(value = "facilityDescription", required = false) String facilityDescription,
            @RequestParam(value = "location", required = false) String location
    ) {
        if (facilityType == null || facilityType.isBlank() || facilityPrice == null) {
            Response errorResponse = new Response();
            errorResponse.setStatusCode(400);
            errorResponse.setMessage("Please provide values for facilityType and facilityPrice");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        Response response = facilityService.addNewFacility(photo, facilityType, facilityPrice, facilityDescription, facilityName,location);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getAllFacilityTypes() {
        return facilityService.getAllFacilityTypes();
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllFacilities() {
        Response response = facilityService.getAllFacilities();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{facilityId}")
    public ResponseEntity<Response> getFacilityById(@PathVariable Long facilityId) {
        Response response = facilityService.getFacilityById(facilityId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{facilityId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteFacility(@PathVariable Long facilityId) {
        Response response = facilityService.deleteFacility(facilityId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{facilityId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateFacility(
            @PathVariable Long facilityId,
            @RequestParam(value = "facilityName", required = false) String facilityName,
            @RequestParam(value = "facilityDescription", required = false) String facilityDescription,
            @RequestParam(value = "facilityType", required = false) String facilityType,
            @RequestParam(value = "facilityPrice", required = false) BigDecimal facilityPrice,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "location", required = false) String location
    ) {
        Response response = facilityService.updateFacility(facilityId, facilityDescription, facilityType, facilityPrice, photo,facilityName,location);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available")
    public ResponseEntity<Response> getAvailableFacilitiesByTimeTypeAndDay(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime,
            @RequestParam String facilityType,
            @RequestParam DayOfWeek dayOfWeek

    ) {
        Response response = facilityService.findAvailableFacilitiesByTimeTypeAndDay(startTime, endTime, facilityType, dayOfWeek);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available/all")
    public ResponseEntity<Response> getAllAvailableFacilities() {
        Response response = facilityService.getAllAvailableFacilities();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
