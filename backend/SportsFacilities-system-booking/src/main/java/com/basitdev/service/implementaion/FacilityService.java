package com.basitdev.service.implementaion;

import com.basitdev.dto.FacilityDTO;
import com.basitdev.dto.Response;
import com.basitdev.entity.Facility;
import com.basitdev.exception.OurException;
import com.basitdev.repository.FacilityRepository;
import com.basitdev.service.FileSystemStorageService;
import com.basitdev.service.inter.IFacilityService;
import com.basitdev.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;



@Service
public class FacilityService implements IFacilityService {


    @Autowired
    private FileSystemStorageService fileSystemStorageService;
    @Autowired
    private FacilityRepository facilityRepository;

    @Override
    public Response addNewFacility(MultipartFile photo, String facilityType, BigDecimal facilityPrice, String facilityDescription,String facilityName, String location) {
        Response response = new Response();

        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = fileSystemStorageService.saveImageToLocal(photo);
            }
            Facility facility = new Facility();

            facility.setFacilityName(facilityName);
            facility.setFacilityPhotoUrl(imageUrl);
            facility.setFacilityType(facilityType);
            facility.setFacilityPrice(facilityPrice);
            facility.setFacilityDescription(facilityDescription);
            facility.setLocation(location);

            Facility savedFacility = facilityRepository.save(facility);
            FacilityDTO facilityDTO = Utils.mapFacilityEntityToFacilityDTO(savedFacility);

            response.setFacility(facilityDTO);
            response.setMessage("successful");
            response.setStatusCode(200);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a facility " + e.getMessage());

        }
        return response;
    }

    @Override
    public List<String> getAllFacilityTypes() {
        return facilityRepository.findDistinctFacilityTypes();
    }

    @Override
    public Response getAllFacilities() {
        Response response = new Response();

        try {
            List<Facility> facilityList = facilityRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<FacilityDTO> facilityDTOList = Utils.mapFacilityListEntityToFaciltyListDTO(facilityList);

            response.setMessage("successful");
            response.setStatusCode(200);
            response.setFacilityList(facilityDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all facilities " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response deleteFacility(Long facilityId) {
        Response response = new Response();

        try {
            facilityRepository.findById(facilityId).orElseThrow(()-> new OurException("facility Not Found"));
            facilityRepository.deleteById(facilityId);

            response.setMessage("successful");
            response.setStatusCode(200);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting a facility " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response updateFacility(Long facilityId, String facilityDescription, String facilityType,
                                   BigDecimal facilityPrice, MultipartFile photo, String facilityName, String location) {
        Response response = new Response();

        try {
            // Fetch the facility from DB
            Facility facility = facilityRepository.findById(facilityId)
                    .orElseThrow(() -> new OurException("Facility Not Found with ID: " + facilityId));

            // Upload new image if provided
            if (photo != null && !photo.isEmpty()) {
                String imageUrl = fileSystemStorageService.saveImageToLocal(photo);
                facility.setFacilityPhotoUrl(imageUrl); // Update image
            }

            // Update fields only if they are not null
            if (facilityName != null) facility.setFacilityName(facilityName);
            if (facilityType != null) facility.setFacilityType(facilityType);
            if (facilityPrice != null) facility.setFacilityPrice(facilityPrice);
            if (facilityDescription != null) facility.setFacilityDescription(facilityDescription);
            if (location != null) facility.setLocation(location);

            // Save updated facility
            Facility updatedFacility = facilityRepository.save(facility);

            // Convert to DTO
            FacilityDTO facilityDTO = Utils.mapFacilityEntityToFacilityDTO(updatedFacility);

            // Return successful response
            response.setStatusCode(200);
            response.setMessage("Facility updated successfully");
            response.setFacility(facilityDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error updating facility: " + e.getMessage());
        }

        return response;
    }



    @Override
    public Response getFacilityById(Long facilityId) {
        Response response = new Response();

        try {
            Facility facility = facilityRepository.findById(facilityId).orElseThrow(()-> new OurException("Facility Not Found"));
            FacilityDTO facilityDTO = Utils.mapFacilityEntityToFacilityDTOPlusBookings(facility);

            response.setMessage("successful");
            response.setStatusCode(200);
            response.setFacility(facilityDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting a facility By Id " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response findAvailableFacilitiesByTimeTypeAndDay(LocalTime startTime, LocalTime endTime, String facilityType, DayOfWeek dayOfWeek) {
        Response response = new Response();

        try {
            List<Facility> availableFacilities = facilityRepository.findAvailableFacilitiesByTimeTypeAndDay(startTime, endTime, facilityType, dayOfWeek);
            List<FacilityDTO> facilityDTOList = Utils.mapFacilityListEntityToFaciltyListDTO(availableFacilities);

            response.setMessage("successful");
            response.setStatusCode(200);
            response.setFacilityList(facilityDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting available facilities " + e.getMessage());
        }
        return response;
    }


    @Override
    public Response getAllAvailableFacilities() {
        Response response = new Response();

        try {
            List<Facility> facilityList = facilityRepository.getAvailableFacilities();
            List<FacilityDTO> facilityDTOList = Utils.mapFacilityListEntityToFaciltyListDTO(facilityList);
            response.setMessage("successful");
            response.setStatusCode(200);
            response.setFacilityList(facilityDTOList);

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting available facilities " + e.getMessage());

        }
        return response;
    }

}
