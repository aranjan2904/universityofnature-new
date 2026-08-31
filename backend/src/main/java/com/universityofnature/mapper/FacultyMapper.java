package com.universityofnature.mapper;

import com.universityofnature.dto.response.FacultyResponse;
import com.universityofnature.entity.Faculty;
import org.springframework.stereotype.Component;

@Component
public class FacultyMapper {

    public FacultyResponse toResponse(Faculty faculty) {
        return new FacultyResponse(
                faculty.getId(),
                faculty.getName(),
                faculty.getDesignation(),
                faculty.getDepartment(),
                faculty.getQualification(),
                faculty.getBio(),
                faculty.getImageUrl(),
                faculty.getCreatedAt(),
                faculty.getUpdatedAt()
        );
    }
}
