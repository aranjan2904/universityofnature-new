package com.universityofnature.dto.response;

import java.time.LocalDateTime;

public record FacultyResponse(
        Long id,
        String name,
        String designation,
        String department,
        String qualification,
        String bio,
        String imageUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
