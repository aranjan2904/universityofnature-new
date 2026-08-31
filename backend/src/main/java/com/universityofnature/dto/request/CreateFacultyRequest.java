package com.universityofnature.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateFacultyRequest(

        @NotBlank(message = "Faculty name is required")
        @Size(max = 150, message = "Faculty name must not exceed 150 characters")
        String name,

        @NotBlank(message = "Designation is required")
        @Size(max = 100, message = "Designation must not exceed 100 characters")
        String designation,

        @NotBlank(message = "Department is required")
        @Size(max = 100, message = "Department must not exceed 100 characters")
        String department,

        @NotBlank(message = "Qualification is required")
        @Size(max = 100, message = "Qualification must not exceed 100 characters")
        String qualification,

        @NotBlank(message = "Bio is required")
        @Size(max = 2000, message = "Bio must not exceed 2000 characters")
        String bio,

        @Size(max = 500, message = "Image URL must not exceed 500 characters")
        String imageUrl
) {
}
