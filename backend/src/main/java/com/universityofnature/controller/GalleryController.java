package com.universityofnature.controller;

import com.universityofnature.dto.request.CreateGalleryRequest;
import com.universityofnature.dto.request.UpdateGalleryRequest;
import com.universityofnature.dto.response.GalleryResponse;
import com.universityofnature.service.CloudinaryService;
import com.universityofnature.service.GalleryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;
    private final CloudinaryService cloudinaryService;

    public GalleryController(
            GalleryService galleryService,
            CloudinaryService cloudinaryService) {

        this.galleryService = galleryService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public ResponseEntity<List<GalleryResponse>> getAllGallery() {
        return ResponseEntity.ok(galleryService.getAllGallery());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GalleryResponse> getGalleryById(
            @PathVariable Long id) {

        return ResponseEntity.ok(galleryService.getGalleryById(id));
    }

    @PostMapping
    public ResponseEntity<GalleryResponse> createGallery(
            @Valid @RequestBody CreateGalleryRequest request) {

        GalleryResponse response = galleryService.createGallery(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GalleryResponse> updateGallery(
            @PathVariable Long id,
            @Valid @RequestBody UpdateGalleryRequest request) {

        return galleryService.updateGallery(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(
            @PathVariable Long id) {

        boolean deleted = galleryService.deleteGallery(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "description", required = false) String description) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Please select an image.");
            }

            String imageUrl = cloudinaryService.uploadImage(file);

            String galleryTitle = (title != null && !title.isBlank())
                    ? title
                    : "Gallery Image";

            String galleryDescription = (description != null && !description.isBlank())
                    ? description
                    : "Uploaded image";

            GalleryResponse savedGallery = galleryService.createGallery(
                    new CreateGalleryRequest(galleryTitle, imageUrl, galleryDescription)
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(savedGallery);

        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Image upload failed.");
        }
    }
}