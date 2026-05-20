package org.example.proiectps.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponseDTO {
    private Long id;
    private Long postId;
    private Long authorId;
    private String author;
    private String text;
    private String image;
    private String createdAt;
    private Long likes;
    private Long dislikes;
    private Long score;
    private Double authorScore;
}