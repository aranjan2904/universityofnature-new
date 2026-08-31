package com.universityofnature.mapper;

import com.universityofnature.dto.response.ContactMessageResponse;
import com.universityofnature.entity.ContactMessage;
import org.springframework.stereotype.Component;

@Component
public class ContactMessageMapper {

    public ContactMessageResponse toResponse(ContactMessage contactMessage) {
        return new ContactMessageResponse(
                contactMessage.getId(),
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getSubject(),
                contactMessage.getMessage(),
                contactMessage.getCreatedAt()
        );
    }
}
