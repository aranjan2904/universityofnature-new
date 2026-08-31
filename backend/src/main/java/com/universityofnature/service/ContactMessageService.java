package com.universityofnature.service;

import com.universityofnature.dto.request.CreateContactMessageRequest;
import com.universityofnature.dto.response.ContactMessageResponse;
import com.universityofnature.entity.ContactMessage;
import com.universityofnature.mapper.ContactMessageMapper;
import com.universityofnature.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactMessageMapper contactMessageMapper;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository,
            ContactMessageMapper contactMessageMapper) {

        this.contactMessageRepository = contactMessageRepository;
        this.contactMessageMapper = contactMessageMapper;
    }

    public ContactMessageResponse createContactMessage(
            CreateContactMessageRequest request) {

        ContactMessage contactMessage = new ContactMessage();

        contactMessage.setName(request.name());
        contactMessage.setEmail(request.email());
        contactMessage.setSubject(request.subject());
        contactMessage.setMessage(request.message());

        ContactMessage savedMessage =
                contactMessageRepository.save(contactMessage);

        return contactMessageMapper.toResponse(savedMessage);
    }

    public List<ContactMessageResponse> getAllMessages() {
        return contactMessageRepository.findAll()
                .stream()
                .map(contactMessageMapper::toResponse)
                .toList();
    }

    public boolean deleteMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            return false;
        }

        contactMessageRepository.deleteById(id);
        return true;
    }
}