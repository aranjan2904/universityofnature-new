package com.universityofnature.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateProgramRequest(

        @NotBlank(message = "Program name is required")
        @Size(max = 150, message = "Program name must not exceed 150 characters")
        String name,

        @NotBlank(message = "Degree is required")
        @Size(max = 100, message = "Degree must not exceed 100 characters")
        String degree,

        @NotBlank(message = "Duration is required")
        @Size(max = 50, message = "Duration must not exceed 50 characters")
        String duration,

        @NotBlank(message = "Description is required")
        String description,

        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl
) 
{
}