package com.universityofnature.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateGalleryRequest(

        @NotBlank(message = "Gallery title is required")
        @Size(max = 150, message = "Gallery title must not exceed 150 characters")
        String title,

        @NotBlank(message = "Image URL is required")
        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl,

        @NotBlank(message = "Description is required")
        String description
) {
}
