package com.basitdev.dto;

import com.basitdev.Config.LocalTimeDeserializer;
import com.basitdev.Config.LocalTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private Long id;
    private DayOfWeek dayOfWeek;
    @JsonSerialize(using = LocalTimeSerializer.class)
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime startTime;
    @JsonSerialize(using = LocalTimeSerializer.class)
    @JsonDeserialize(using = LocalTimeDeserializer.class)
    private LocalTime endTime;
    private String bookingConfirmationCode;
    private UserDTO user;
    private FacilityDTO facility;


}
