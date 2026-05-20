package org.example.proiectps.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDTO {
    private String id;
    private String author;
    private String title;
    private String text;
    private String image;
    private String createdAt;
    private String status;
    private long likes;
    private long dislikes;
    private double score;
    private List<String> tags;
}