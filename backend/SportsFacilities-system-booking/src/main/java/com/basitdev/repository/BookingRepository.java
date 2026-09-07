package com.basitdev.repository;

import com.basitdev.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByConfirmationCode(String confirmationCode);
    List<Booking> findByFacilityIdAndDayOfWeek(Long facilityId, DayOfWeek dayOfWeek);
    List<Booking> findByUserIdAndDayOfWeek(Long userId, DayOfWeek dayOfWeek);
}
