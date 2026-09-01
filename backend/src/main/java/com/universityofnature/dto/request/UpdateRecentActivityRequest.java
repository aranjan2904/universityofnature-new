package com.universityofnature.dto.request;

import jakarta.validation.constraints.Size;

public record UpdateRecentActivityRequest(

        @Size(max = 150, message = "Activity title must not exceed 150 characters")
        String title,

        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl,

        String description,

        Boolean enabled,

        Integer order
) {
}
