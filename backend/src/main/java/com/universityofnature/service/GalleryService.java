package com.universityofnature.service;

import com.universityofnature.dto.request.CreateGalleryRequest;
import com.universityofnature.dto.request.UpdateGalleryRequest;
import com.universityofnature.dto.response.GalleryResponse;
import com.universityofnature.entity.Gallery;
import com.universityofnature.exception.ResourceNotFoundException;
import com.universityofnature.mapper.GalleryMapper;
import com.universityofnature.repository.GalleryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final GalleryMapper galleryMapper;

    public GalleryService(
            GalleryRepository galleryRepository,
            GalleryMapper galleryMapper) {

        this.galleryRepository = galleryRepository;
        this.galleryMapper = galleryMapper;
    }

    public List<GalleryResponse> getAllGallery() {

        return galleryRepository.findAll()
                .stream()
                .map(galleryMapper::toResponse)
                .toList();
    }

    public GalleryResponse getGalleryById(Long id) {

        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Gallery not found with id: " + id));

        return galleryMapper.toResponse(gallery);
    }

    public GalleryResponse createGallery(CreateGalleryRequest request) {

        Gallery gallery = new Gallery();

        gallery.setTitle(request.title());
        gallery.setImageUrl(request.imageUrl());
        gallery.setDescription(request.description());

        Gallery savedGallery = galleryRepository.save(gallery);

        return galleryMapper.toResponse(savedGallery);
    }

    public Optional<GalleryResponse> updateGallery(
            Long id,
            UpdateGalleryRequest request) {

        return galleryRepository.findById(id)
                .map(gallery -> {

                    gallery.setTitle(request.title());
                    gallery.setImageUrl(request.imageUrl());
                    gallery.setDescription(request.description());

                    Gallery updatedGallery = galleryRepository.save(gallery);

                    return galleryMapper.toResponse(updatedGallery);
                });
    }

    public boolean deleteGallery(Long id) {

        if (!galleryRepository.existsById(id)) {
            return false;
        }

        galleryRepository.deleteById(id);
        return true;
    }
}
