package com.basitdev.utils;

import com.basitdev.dto.BookingDTO;
import com.basitdev.dto.FacilityDTO;
import com.basitdev.dto.UserDTO;
import com.basitdev.entity.Booking;
import com.basitdev.entity.Facility;
import com.basitdev.entity.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static FacilityDTO mapFacilityEntityToFacilityDTO(Facility facility) {
        FacilityDTO facilityDTO = new FacilityDTO();

        facilityDTO.setId(facility.getId());
        facilityDTO.setFacilityName(facility.getFacilityName());
        facilityDTO.setFacilityPrice(facility.getFacilityPrice());
        facilityDTO.setFacilityType(facility.getFacilityType());
        facilityDTO.setFacilityDescription(facility.getFacilityDescription());
        facilityDTO.setFacilityPhotoUrl(facility.getFacilityPhotoUrl());
        facilityDTO.setLocation(facility.getLocation());
        return facilityDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setDayOfWeek(booking.getDayOfWeek());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setBookingConfirmationCode(booking.getConfirmationCode());
        return bookingDTO;
    }
    public static FacilityDTO mapFacilityEntityToFacilityDTOPlusBookings(Facility facility) {
        FacilityDTO facilityDTO = new FacilityDTO();

        facilityDTO.setId(facility.getId());
        facilityDTO.setFacilityName(facility.getFacilityName());
        facilityDTO.setFacilityPrice(facility.getFacilityPrice());
        facilityDTO.setFacilityType(facility.getFacilityType());
        facilityDTO.setFacilityDescription(facility.getFacilityDescription());
        facilityDTO.setFacilityPhotoUrl(facility.getFacilityPhotoUrl());
        facilityDTO.setLocation(facility.getLocation());
        if (facility.getBookings() != null) {
            facilityDTO.setBookings(facility.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return facilityDTO;
    }
    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setDayOfWeek(booking.getDayOfWeek());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setBookingConfirmationCode(booking.getConfirmationCode());
        if (mapUser) {
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }
        if (booking.getFacility() != null) {
            FacilityDTO facilityDTO = new FacilityDTO();

            facilityDTO.setId(booking.getId());
            facilityDTO.setFacilityName(booking.getFacility().getFacilityName());
            facilityDTO.setFacilityPrice(booking.getFacility().getFacilityPrice());
            facilityDTO.setFacilityType(booking.getFacility().getFacilityType());
            facilityDTO.setFacilityDescription(booking.getFacility().getFacilityDescription());
            facilityDTO.setFacilityPhotoUrl(booking.getFacility().getFacilityPhotoUrl());
            facilityDTO.setLocation(booking.getFacility().getLocation());
        }
        return bookingDTO;
    }
    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user){
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()){
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false)).collect(Collectors.toList()));
        }
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList){
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<FacilityDTO> mapFacilityListEntityToFaciltyListDTO(List<Facility> facilityList){
        return facilityList.stream().map(Utils::mapFacilityEntityToFacilityDTO).collect(Collectors.toList());
    }
    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList){
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

}
