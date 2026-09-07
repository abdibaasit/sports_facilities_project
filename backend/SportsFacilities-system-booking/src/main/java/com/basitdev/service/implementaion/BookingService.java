package com.basitdev.service.implementaion;

import com.basitdev.dto.BookingDTO;
import com.basitdev.dto.Response;
import com.basitdev.entity.Booking;
import com.basitdev.entity.Facility;
import com.basitdev.entity.User;
import com.basitdev.exception.OurException;
import com.basitdev.repository.BookingRepository;
import com.basitdev.repository.FacilityRepository;
import com.basitdev.repository.UserRepository;
import com.basitdev.service.inter.IBookingService;
import com.basitdev.service.inter.IFacilityService;
import com.basitdev.utils.Utils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private IFacilityService facilityService;

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Response saveBooking(Long facilityId, Long userId, Booking bookingRequest) {
        Response response = new Response();

        try {
            Facility facility = facilityRepository.findById(facilityId)
                    .orElseThrow(() -> new OurException("Facility Not Found"));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new OurException("User Not Found"));

            if (bookingRequest.getEndTime().isBefore(bookingRequest.getStartTime()) ||
                    bookingRequest.getEndTime().equals(bookingRequest.getStartTime())) {
                throw new OurException("End time must be after start time");
            }

            List<Booking> existingBookings = bookingRepository.findByFacilityIdAndDayOfWeek(
                    facilityId, bookingRequest.getDayOfWeek()
            );

            boolean isOverlapping = existingBookings.stream().anyMatch(existing ->
                    bookingRequest.getStartTime().isBefore(existing.getEndTime()) &&
                            bookingRequest.getEndTime().isAfter(existing.getStartTime())
            );

            if (isOverlapping) {
                throw new OurException("Facility already booked for the selected time range on " + bookingRequest.getDayOfWeek());
            }
            List<Booking> userBookings = bookingRepository.findByUserIdAndDayOfWeek(
                    userId, bookingRequest.getDayOfWeek()
            );

            boolean userHasConflict = userBookings.stream().anyMatch(existing ->
                    bookingRequest.getStartTime().isBefore(existing.getEndTime()) &&
                            bookingRequest.getEndTime().isAfter(existing.getStartTime())
            );

            if (userHasConflict) {
                throw new OurException("User already has a booking at this time on " + bookingRequest.getDayOfWeek());
            }


            bookingRequest.setFacility(facility);
            bookingRequest.setUser(user);
            bookingRequest.setConfirmationCode(Utils.generateRandomConfirmationCode(10));
            bookingRepository.save(bookingRequest);

            response.setStatusCode(200);
            response.setMessage("Booking saved successfully");
            response.setBookingConfirmationCode(bookingRequest.getConfirmationCode());

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving booking: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {
        Response response = new Response();

        try {
            Booking booking = bookingRepository.findByConfirmationCode(confirmationCode)
                    .orElseThrow(() -> new OurException("Booking Not Found"));

            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTO(booking);
            response.setBooking(bookingDTO);
            response.setStatusCode(200);
            response.setMessage("Booking retrieved successfully");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving booking: " + e.getMessage());
        }

        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();

        try {
            List<Booking> bookings = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<BookingDTO> bookingDTOList = Utils.mapBookingListEntityToBookingListDTO(bookings);
            response.setBookingList(bookingDTOList);
            response.setStatusCode(200);
            response.setMessage("Bookings retrieved successfully");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error retrieving bookings: " + e.getMessage());
        }

        return response;
    }
    @Override
    public Response cancelBooking(Long bookingId) {

        Response response = new Response();

        try {
            bookingRepository.findById(bookingId).orElseThrow(() -> new OurException("Booking Does Not Exist"));
            bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Cancelling a booking: " + e.getMessage());

        }
        return response;
    }



}
