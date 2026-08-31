package com.universityofnature.service;

import com.universityofnature.dto.request.CreateProgramRequest;
import com.universityofnature.dto.request.UpdateProgramRequest;
import com.universityofnature.dto.response.ProgramResponse;
import com.universityofnature.entity.Program;
import com.universityofnature.exception.ResourceNotFoundException;
import com.universityofnature.mapper.ProgramMapper;
import com.universityofnature.repository.ProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    // Dependency Injection
    private final ProgramRepository programRepository;
    private final ProgramMapper programMapper;

    // DI constructor
    public ProgramService(
            ProgramRepository programRepository,
            ProgramMapper programMapper) {

        this.programRepository = programRepository;
        this.programMapper = programMapper;
    }

    // get all program
    public List<ProgramResponse> getAllPrograms() {

        return programRepository.findAll()
                .stream()
                .map(programMapper::toResponse)
                .toList();
    }

    // get program by id
    public ProgramResponse getProgramById(Long id) {

        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Program not found with id: " + id));

        return programMapper.toResponse(program);
    }

    // create program
    public ProgramResponse createProgram(CreateProgramRequest request) {

        Program program = new Program();

        program.setName(request.name());
        program.setDegree(request.degree());
        program.setDuration(request.duration());
        program.setDescription(request.description());
        program.setImageUrl(request.imageUrl());

        Program savedProgram = programRepository.save(program);

        return programMapper.toResponse(savedProgram);
    }

    // update program
    public Optional<ProgramResponse> updateProgram(
            Long id,
            UpdateProgramRequest request) {

        return programRepository.findById(id)
                .map(program -> {

                    program.setName(request.name());
                    program.setDegree(request.degree());
                    program.setDuration(request.duration());
                    program.setDescription(request.description());
                    program.setImageUrl(request.imageUrl());

                    Program updatedProgram = programRepository.save(program);

                    return programMapper.toResponse(updatedProgram);
                });
    }

    // delete program
    public boolean deleteProgram(Long id) {

        if (!programRepository.existsById(id)) {
            return false;
        }

        programRepository.deleteById(id);
        return true;
    }
}