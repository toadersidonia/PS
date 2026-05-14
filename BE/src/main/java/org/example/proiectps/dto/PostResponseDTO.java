package org.example.proiectps.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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
}