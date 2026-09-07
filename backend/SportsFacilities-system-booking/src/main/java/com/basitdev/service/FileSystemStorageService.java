package com.basitdev.service;

import com.basitdev.exception.OurException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@Service
public class FileSystemStorageService {

    // Folder where images will be stored, you can set this in application.properties
    @Value("${upload.dir}")
    private String uploadDir;

    public String saveImageToLocal(MultipartFile photo) {
        try {
            // Ensure upload directory exists
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Build destination file path
            String originalFileName = photo.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                throw new OurException("Invalid file name");
            }

            Path filePath = uploadPath.resolve(originalFileName);
            Files.copy(photo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return a file system path or relative URL
            return "/uploads/" + originalFileName;

        } catch (IOException e) {
            e.printStackTrace();
            throw new OurException("Failed to store image");
        }
    }
}
