package org.example.proiectps.service;

import lombok.RequiredArgsConstructor;
import org.example.proiectps.dto.PostRequestDTO;
import org.example.proiectps.dto.PostResponseDTO;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // CREATE
    public PostResponseDTO addPost(PostRequestDTO dto, Long userId) {

        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setAuthor(author);
        post.setTitle(dto.getTitle());
        post.setText(dto.getText());
        post.setImage(dto.getImage());
        post.setDate(LocalDateTime.now());

        return mapToDTO(postRepository.save(post));
    }

    // READ ALL
    public List<PostResponseDTO> getAllPosts() {
        return postRepository.findAllByOrderByDateDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // READ BY ID
    public PostResponseDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return mapToDTO(post);
    }

    // UPDATE
    public PostResponseDTO updatePost(Long id, PostRequestDTO dto, Long userId) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("Not allowed");
        }

        post.setTitle(dto.getTitle());
        post.setText(dto.getText());
        post.setImage(dto.getImage());

        return mapToDTO(postRepository.save(post));
    }

    // DELETE
    public void deletePost(Long id, Long userId) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("Not allowed");
        }

        postRepository.delete(post);
    }

    // MAPPER
    private PostResponseDTO mapToDTO(Post post) {

        PostResponseDTO dto = new PostResponseDTO();

        dto.setId(post.getPostId().toString());
        dto.setAuthor(post.getAuthor().getUsername());
        dto.setTitle(post.getTitle());
        dto.setText(post.getText());
        dto.setImage(post.getImage());
        dto.setCreatedAt(post.getDate().toString());
        dto.setStatus(post.getStatus().name());

        return dto;
    }
}