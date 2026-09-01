package com.universityofnature.controller;

import com.universityofnature.dto.request.CreateProgramRequest;
import com.universityofnature.dto.request.UpdateProgramRequest;
import com.universityofnature.dto.response.ProgramResponse;
import com.universityofnature.service.ProgramService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    // Dependency Injection
    private final ProgramService programService;

    // DI constructor
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    // get all program
    @GetMapping
    public ResponseEntity<List<ProgramResponse>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    // get program by id
    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponse> getProgramById(@PathVariable Long id) {

        return ResponseEntity.ok(
                programService.getProgramById(id));
    }

    // create program
    @PostMapping
    public ResponseEntity<ProgramResponse> createProgram(
            @Valid @RequestBody CreateProgramRequest request) {

        ProgramResponse response = programService.createProgram(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // update program
    @PutMapping("/{id}")
    public ResponseEntity<ProgramResponse> updateProgram(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProgramRequest request) {

        return programService.updateProgram(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // delete program
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(
            @PathVariable Long id) {

        boolean deleted = programService.deleteProgram(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}