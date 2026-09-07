package com.basitdev.service.inter;

import com.basitdev.dto.Response;
import com.basitdev.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long facilityId, Long userId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
