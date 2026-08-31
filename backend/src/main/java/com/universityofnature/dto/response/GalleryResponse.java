package com.universityofnature.dto.response;

import java.time.LocalDateTime;

public record GalleryResponse(
        Long id,
        String title,
        String imageUrl,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
