package org.example.proiectps.service;

import org.example.proiectps.dto.CommentRequestDTO;
import org.example.proiectps.dto.CommentResponseDTO;
import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public CommentResponseDTO createComment(CommentRequestDTO dto, Long postId, Long userId) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if ((dto.getText() == null || dto.getText().trim().isEmpty())
                && (dto.getImage() == null || dto.getImage().isEmpty())) {
            throw new RuntimeException("Comment must have text or image");
        }

        Comment comment = new Comment();
        comment.setAuthor(author);
        comment.setPost(post);
        comment.setText(dto.getText());
        comment.setImage(dto.getImage());
        comment.setDate(LocalDateTime.now());

        Comment saved = commentRepository.save(comment);

        return mapToDTO(saved);
    }

    public List<CommentResponseDTO> retrieveComments(Long postId) {
        postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepository.findByPostPostId(postId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public CommentResponseDTO updateComment(Long commentId, CommentRequestDTO dto, Long userId) {
        Comment existing = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!existing.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to edit this comment");
        }

        existing.setText(dto.getText());
        existing.setImage(dto.getImage());

        Comment updated = commentRepository.save(existing);

        return mapToDTO(updated);
    }

    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getAuthor().getUserId().equals(userId)
                && !comment.getPost().getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to delete this comment");
        }

        commentRepository.delete(comment);
    }

    public CommentResponseDTO getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        return mapToDTO(comment);
    }

    private CommentResponseDTO mapToDTO(Comment c) {
        CommentResponseDTO dto = new CommentResponseDTO();

        dto.setId(c.getCommId());
        dto.setPostId(c.getPost().getPostId());
        dto.setAuthorId(c.getAuthor().getUserId());
        dto.setAuthor(c.getAuthor().getUsername());
        dto.setText(c.getText());
        dto.setImage(c.getImage());
        dto.setCreatedAt(c.getDate().toString());

        return dto;
    }
}