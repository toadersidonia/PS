package org.example.proiectps.controller;

import lombok.RequiredArgsConstructor;
import org.example.proiectps.entity.Tag;
import org.example.proiectps.repository.TagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@CrossOrigin
public class TagController {

    private final TagRepository tagRepository;

    @GetMapping
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
}