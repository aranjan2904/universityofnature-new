package com.universityofnature.service;

import com.universityofnature.dto.request.CreateFacultyRequest;
import com.universityofnature.dto.request.UpdateFacultyRequest;
import com.universityofnature.dto.response.FacultyResponse;
import com.universityofnature.entity.Faculty;
import com.universityofnature.exception.ResourceNotFoundException;
import com.universityofnature.mapper.FacultyMapper;
import com.universityofnature.repository.FacultyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;
    private final FacultyMapper facultyMapper;

    public FacultyService(
            FacultyRepository facultyRepository,
            FacultyMapper facultyMapper) {

        this.facultyRepository = facultyRepository;
        this.facultyMapper = facultyMapper;
    }

    public List<FacultyResponse> getAllFaculty() {

        return facultyRepository.findAll()
                .stream()
                .map(facultyMapper::toResponse)
                .toList();
    }

    public FacultyResponse getFacultyById(Long id) {

        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Faculty not found with id: " + id));

        return facultyMapper.toResponse(faculty);
    }

    public FacultyResponse createFaculty(CreateFacultyRequest request) {

        Faculty faculty = new Faculty();

        faculty.setName(request.name());
        faculty.setDesignation(request.designation());
        faculty.setDepartment(request.department());
        faculty.setQualification(request.qualification());
        faculty.setBio(request.bio());
        faculty.setImageUrl(request.imageUrl());

        Faculty savedFaculty = facultyRepository.save(faculty);

        return facultyMapper.toResponse(savedFaculty);
    }

    public Optional<FacultyResponse> updateFaculty(
            Long id,
            UpdateFacultyRequest request) {

        return facultyRepository.findById(id)
                .map(faculty -> {

                    faculty.setName(request.name());
                    faculty.setDesignation(request.designation());
                    faculty.setDepartment(request.department());
                    faculty.setQualification(request.qualification());
                    faculty.setBio(request.bio());
                    faculty.setImageUrl(request.imageUrl());

                    Faculty updatedFaculty = facultyRepository.save(faculty);

                    return facultyMapper.toResponse(updatedFaculty);
                });
    }

    public boolean deleteFaculty(Long id) {

        if (!facultyRepository.existsById(id)) {
            return false;
        }

        facultyRepository.deleteById(id);
        return true;
    }
}
