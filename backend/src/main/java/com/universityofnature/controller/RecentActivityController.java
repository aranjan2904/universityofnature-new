package com.universityofnature.controller;

import com.universityofnature.dto.request.CreateRecentActivityRequest;
import com.universityofnature.dto.request.UpdateRecentActivityRequest;
import com.universityofnature.dto.response.RecentActivityResponse;
import com.universityofnature.service.CloudinaryService;
import com.universityofnature.service.RecentActivityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/recent-activity")
public class RecentActivityController {

    private final RecentActivityService recentActivityService;
    private final CloudinaryService cloudinaryService;

    public RecentActivityController(
            RecentActivityService recentActivityService,
            CloudinaryService cloudinaryService) {

        this.recentActivityService = recentActivityService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public ResponseEntity<List<RecentActivityResponse>> getAllActivities(
            @RequestParam(value = "enabled", required = false) Boolean enabled) {

        if (enabled != null && enabled) {
            return ResponseEntity.ok(recentActivityService.getEnabledActivities());
        }

        return ResponseEntity.ok(recentActivityService.getAllActivities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecentActivityResponse> getActivityById(
            @PathVariable Long id) {

        return ResponseEntity.ok(recentActivityService.getActivityById(id));
    }

    @PostMapping
    public ResponseEntity<RecentActivityResponse> createActivity(
            @Valid @RequestBody CreateRecentActivityRequest request) {

        RecentActivityResponse response = recentActivityService.createActivity(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecentActivityResponse> updateActivity(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRecentActivityRequest request) {

        return recentActivityService.updateActivity(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/order")
    public ResponseEntity<RecentActivityResponse> updateActivityOrder(
            @PathVariable Long id,
            @RequestBody UpdateRecentActivityRequest request) {

        return recentActivityService.updateActivityOrder(id, request.order())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(
            @PathVariable Long id) {

        boolean deleted = recentActivityService.deleteActivity(id);

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

            String activityTitle = (title != null && !title.isBlank())
                    ? title
                    : "Recent Activity";

            String activityDescription = (description != null && !description.isBlank())
                    ? description
                    : "Activity photo";

            RecentActivityResponse savedActivity = recentActivityService.createActivity(
                    new CreateRecentActivityRequest(activityTitle, imageUrl, activityDescription)
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(savedActivity);

        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Image upload failed.");
        }
    }
}
