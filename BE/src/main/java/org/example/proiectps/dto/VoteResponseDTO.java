package org.example.proiectps.dto;

import lombok.Data;

@Data
public class VoteResponseDTO {
    private CommentResponseDTO comment;
    private Double voterScore;
}