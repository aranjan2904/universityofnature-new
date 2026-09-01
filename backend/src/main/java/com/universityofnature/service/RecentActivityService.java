package com.universityofnature.service;

import com.universityofnature.dto.request.CreateRecentActivityRequest;
import com.universityofnature.dto.request.UpdateRecentActivityRequest;
import com.universityofnature.dto.response.RecentActivityResponse;
import com.universityofnature.entity.RecentActivity;
import com.universityofnature.exception.ResourceNotFoundException;
import com.universityofnature.mapper.RecentActivityMapper;
import com.universityofnature.repository.RecentActivityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecentActivityService {

    private final RecentActivityRepository recentActivityRepository;
    private final RecentActivityMapper recentActivityMapper;

    public RecentActivityService(
            RecentActivityRepository recentActivityRepository,
            RecentActivityMapper recentActivityMapper) {

        this.recentActivityRepository = recentActivityRepository;
        this.recentActivityMapper = recentActivityMapper;
    }

    public List<RecentActivityResponse> getAllActivities() {
        return recentActivityRepository.findAll()
                .stream()
                .sorted((a, b) -> a.getDisplayOrder().compareTo(b.getDisplayOrder()))
                .map(recentActivityMapper::toResponse)
                .toList();
    }

    public List<RecentActivityResponse> getEnabledActivities() {
        return recentActivityRepository.findByEnabledOrderByDisplayOrderAsc(true)
                .stream()
                .map(recentActivityMapper::toResponse)
                .toList();
    }

    public RecentActivityResponse getActivityById(Long id) {
        RecentActivity activity = recentActivityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Recent activity not found with id: " + id));

        return recentActivityMapper.toResponse(activity);
    }

    public RecentActivityResponse createActivity(CreateRecentActivityRequest request) {
        RecentActivity activity = new RecentActivity();

        activity.setTitle(request.title());
        activity.setImageUrl(request.imageUrl());
        activity.setDescription(request.description());
        activity.setEnabled(true);
        activity.setDisplayOrder(0);

        RecentActivity savedActivity = recentActivityRepository.save(activity);
        return recentActivityMapper.toResponse(savedActivity);
    }

    public Optional<RecentActivityResponse> updateActivity(
            Long id,
            UpdateRecentActivityRequest request) {

        return recentActivityRepository.findById(id)
                .map(activity -> {
                    if (request.title() != null && !request.title().isBlank()) {
                        activity.setTitle(request.title());
                    }
                    if (request.imageUrl() != null && !request.imageUrl().isBlank()) {
                        activity.setImageUrl(request.imageUrl());
                    }
                    if (request.description() != null && !request.description().isBlank()) {
                        activity.setDescription(request.description());
                    }
                    if (request.enabled() != null) {
                        activity.setEnabled(request.enabled());
                    }
                    if (request.order() != null) {
                        activity.setDisplayOrder(request.order());
                    }

                    RecentActivity updatedActivity = recentActivityRepository.save(activity);
                    return recentActivityMapper.toResponse(updatedActivity);
                });
    }

    public boolean deleteActivity(Long id) {
        if (!recentActivityRepository.existsById(id)) {
            return false;
        }

        recentActivityRepository.deleteById(id);
        return true;
    }

    public Optional<RecentActivityResponse> updateActivityOrder(Long id, Integer order) {
        return recentActivityRepository.findById(id)
                .map(activity -> {
                    activity.setDisplayOrder(order);
                    RecentActivity updatedActivity = recentActivityRepository.save(activity);
                    return recentActivityMapper.toResponse(updatedActivity);
                });
    }
}
