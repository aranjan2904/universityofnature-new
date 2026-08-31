package com.universityofnature.controller;

import com.universityofnature.dto.request.CreateContactMessageRequest;
import com.universityofnature.dto.response.ContactMessageResponse;
import com.universityofnature.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ContactMessageResponse> createContactMessage(
            @Valid @RequestBody CreateContactMessageRequest request) {

        ContactMessageResponse response = contactMessageService.createContactMessage(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
