package com.universityofnature.mapper;

import com.universityofnature.dto.response.ProgramResponse;
import com.universityofnature.entity.Program;
import org.springframework.stereotype.Component;

@Component
public class ProgramMapper {

    public ProgramResponse toResponse(Program program) {
        return new ProgramResponse(
                program.getId(),
                program.getName(),
                program.getDegree(),
                program.getDuration(),
                program.getDescription(),
                program.getImageUrl(),
                program.getCreatedAt(),
                program.getUpdatedAt()
        );
    }
}