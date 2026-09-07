package com.basitdev.repository;

import com.basitdev.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility,Long> {
    @Query("SELECT distinct f.facilityType from Facility f")
    List<String> findDistinctFacilityTypes();
    @Query("SELECT f FROM Facility f WHERE f.id NOT IN (SELECT b.facility.id FROM Booking b)")
    List<Facility> getAvailableFacilities();
    @Query("""
    SELECT f FROM Facility f 
    WHERE f.facilityType = :facilityType
    AND f.facilityName = :facilityName
    AND f.id NOT IN (
        SELECT b.facility.id FROM Booking b 
        WHERE b.dayOfWeek = :dayOfWeek 
        AND (
            (:startTime < b.endTime AND :endTime > b.startTime)
        )
    )
""")
    List<Facility> findAvailableFacilitiesByTimeTypeAndDay(LocalTime startTime, LocalTime endTime, String facilityType, DayOfWeek dayOfWeek);
}

