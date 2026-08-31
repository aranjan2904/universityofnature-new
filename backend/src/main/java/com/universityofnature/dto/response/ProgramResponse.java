package com.universityofnature.dto.response;

import java.time.LocalDateTime;

public record ProgramResponse(
        Long id,
        String name,
        String degree,
        String duration,
        String description,
        String imageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}