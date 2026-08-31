package com.universityofnature.mapper;

import com.universityofnature.dto.response.GalleryResponse;
import com.universityofnature.entity.Gallery;
import org.springframework.stereotype.Component;

@Component
public class GalleryMapper {

    public GalleryResponse toResponse(Gallery gallery) {
        return new GalleryResponse(
                gallery.getId(),
                gallery.getTitle(),
                gallery.getImageUrl(),
                gallery.getDescription(),
                gallery.getCreatedAt(),
                gallery.getUpdatedAt()
        );
    }
}
