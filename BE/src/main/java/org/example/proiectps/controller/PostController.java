package org.example.proiectps.controller;

import lombok.RequiredArgsConstructor;
import org.example.proiectps.dto.PostRequestDTO;
import org.example.proiectps.dto.PostResponseDTO;
import org.example.proiectps.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")

public class PostController {

    @Autowired
    private PostService postService;

    // CREATE
    @PostMapping
    public PostResponseDTO addPost(
            @RequestBody PostRequestDTO dto,
            @RequestParam Long userId
    ) {
        return postService.addPost(dto, userId);
    }

    // READ ALL
    @GetMapping
    public List<PostResponseDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public PostResponseDTO getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public PostResponseDTO updatePost(
            @PathVariable Long id,
            @RequestBody PostRequestDTO dto,
            @RequestParam Long userId
    ) {
        return postService.updatePost(id, dto, userId);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deletePost(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        postService.deletePost(id, userId);
    }

    @PostMapping("/{id}/like")
    public PostResponseDTO likePost(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        return postService.votePost(id, userId, true);
    }

    @PostMapping("/{id}/dislike")
    public PostResponseDTO dislikePost(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        return postService.votePost(id, userId, false);
    }

    @PostMapping("/{id}/close-comments")
    public PostResponseDTO closeComments(@PathVariable Long id, @RequestParam Long userId) {
        return postService.closeComments(id, userId);
    }
}