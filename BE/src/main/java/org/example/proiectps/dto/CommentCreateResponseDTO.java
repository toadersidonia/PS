package org.example.proiectps.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.proiectps.enums.PostStatus;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommentCreateResponseDTO {
    private CommentResponseDTO comment;
    private Long postId;
    private PostStatus postStatus;
}