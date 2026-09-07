package com.basitdev.Config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.util.Locale;

public class LocalTimeDeserializer extends JsonDeserializer<LocalTime> {

    private static final DateTimeFormatter FORMATTER = new DateTimeFormatterBuilder()
            .parseCaseInsensitive()
            .appendOptional(DateTimeFormatter.ofPattern("HH:mm:ss"))
            .appendOptional(DateTimeFormatter.ofPattern("HH:mm"))
            .appendOptional(DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH))
            .appendOptional(DateTimeFormatter.ofPattern("h:mm a", Locale.ENGLISH))
            .toFormatter();

    @Override
    public LocalTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String time = p.getText().trim().replaceAll("\\s+", " ");
        try {
            return LocalTime.parse(time, FORMATTER);
        } catch (Exception e) {
            return LocalTime.parse(time.toUpperCase(Locale.ENGLISH), FORMATTER);
        }
    }
}
