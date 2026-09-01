package com.universityofnature.dto.response;

import java.time.LocalDateTime;

public record RecentActivityResponse(
        Long id,
        String title,
        String imageUrl,
        String description,
        Boolean enabled,
        Integer order,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
