package com.traveller.laos.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {
    @Value("${file.upload-dir:uploads/destinations}")
    private String uploadDir;

    @Value("${file.upload-dir-festivals:uploads/festivals}")
    private String festivalUploadDir;

    @Value("${file.upload-dir-articles:uploads/articles}")
    private String articleUploadDir;

    public String saveDestinationThumbnail(Long destinationId, MultipartFile file) throws IOException {
        String fileName = "thumbnail-" + UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        return saveFile(destinationId, file, fileName);
    }

    public String saveDestinationImage(Long destinationId, MultipartFile file) throws IOException {
        String fileName = "image-" + UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        return saveFile(destinationId, file, fileName);
    }

    private String saveFile(Long destinationId, MultipartFile file, String fileName) throws IOException {
        Path destinationPath = Paths.get(uploadDir, destinationId.toString());
        
        // Tạo folder nếu chưa tồn tại
        if (!Files.exists(destinationPath)) {
            Files.createDirectories(destinationPath);
        }

        Path filePath = destinationPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Trả về đường dẫn tương đối để lưu vào database
        return "/uploads/destinations/" + destinationId + "/" + fileName;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return ".jpg";
        }
        return fileName.substring(fileName.lastIndexOf("."));
    }

    public void deleteFile(String filePath) {
        try {
            Path path = Paths.get(filePath.replace("/uploads/destinations/", uploadDir + "/"));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Log error but don't throw
        }
    }

    public String saveFestivalThumbnail(Long festivalId, MultipartFile file) throws IOException {
        String fileName = "thumbnail-" + UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        Path festivalPath = Paths.get(festivalUploadDir, festivalId.toString());
        if (!Files.exists(festivalPath)) {
            Files.createDirectories(festivalPath);
        }
        Path filePath = festivalPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        return "/uploads/festivals/" + festivalId + "/" + fileName;
    }

    public void deleteFestivalFile(String filePath) {
        try {
            Path path = Paths.get(filePath.replace("/uploads/festivals/", festivalUploadDir + "/"));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Log error but don't throw
        }
    }

    public String saveArticleThumbnail(Long articleId, MultipartFile file) throws IOException {
        String fileName = "thumbnail-" + UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        Path articlePath = Paths.get(articleUploadDir, articleId.toString());
        if (!Files.exists(articlePath)) {
            Files.createDirectories(articlePath);
        }
        Path filePath = articlePath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        return "/uploads/articles/" + articleId + "/" + fileName;
    }

    public void deleteArticleFile(String filePath) {
        try {
            Path path = Paths.get(filePath.replace("/uploads/articles/", articleUploadDir + "/"));
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Log error but don't throw
        }
    }
}
