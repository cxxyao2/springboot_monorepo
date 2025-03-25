package com.jane.booknetworkapi.file;

import com.jane.booknetworkapi.book.Book;
import lombok.NonNull;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static java.lang.System.currentTimeMillis;

@Service
@Slf4j
public class FileStorageService {

    @Value("${application.file.upload.photos-output-path}")
    private String fileUploadPath;

    public String saveFile(
            @NonNull  MultipartFile sourceFile,
            @NonNull Integer userId) {
        final String fileUploadSubPath = "users" + File.separator + userId;
        return uploadFile(sourceFile, fileUploadSubPath);


    }

    private String uploadFile(
            @NonNull MultipartFile sourceFile,
            @NonNull String fileUploadSubPath) {
        final String finalUploadPath = fileUploadPath + File.separator + fileUploadSubPath;
        File targetFolder = new File(finalUploadPath);
        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();  // folder + subfolders
            if (!folderCreated) {
                log.warn("Failed to created the target folder");
                return null;
            }
        }
        final String fileExtension = getFileExtension(sourceFile.getOriginalFilename());
        // ./upload/users/1/1223332.jpg
        String targetFilePath = finalUploadPath + File.separator + currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);
        try {
            Files.write(targetPath, sourceFile.getBytes());
            log.info("Successfully uploaded file: " + targetFilePath);
            return targetFilePath;
        } catch(IOException e) {
            log.error("Failed to write the file to the target folder",e);
        }
        return null;
    }

    private String getFileExtension(String fileName) {
        if(fileName == null || fileName.isEmpty()) {
            return "";
        }
        int lastIndex = fileName.lastIndexOf(".");
        if(lastIndex == -1) {
            return "";
        }
        return fileName.substring(lastIndex + 1).toLowerCase();
    }
}

