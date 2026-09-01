package com.universityofnature.mapper;

import com.universityofnature.dto.response.RecentActivityResponse;
import com.universityofnature.entity.RecentActivity;
import org.springframework.stereotype.Component;

@Component
public class RecentActivityMapper {

    public RecentActivityResponse toResponse(RecentActivity activity) {
        return new RecentActivityResponse(
                activity.getId(),
                activity.getTitle(),
                activity.getImageUrl(),
                activity.getDescription(),
                activity.getEnabled(),
                activity.getDisplayOrder(),
                activity.getCreatedAt(),
                activity.getUpdatedAt()
        );
    }
}
