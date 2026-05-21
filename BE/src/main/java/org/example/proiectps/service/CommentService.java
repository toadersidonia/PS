package org.example.proiectps.service;

import org.example.proiectps.dto.CommentCreateResponseDTO;
import org.example.proiectps.dto.CommentRequestDTO;
import org.example.proiectps.dto.CommentResponseDTO;
import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.PostStatus;
import org.example.proiectps.enums.VoteType;
import org.example.proiectps.repository.CommentLikeRepository;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    @Autowired
    private CommentLikeRepository commentLikeRepository;


    public CommentCreateResponseDTO createComment(CommentRequestDTO dto, Long postId, Long userId) {

        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (post.getStatus() == PostStatus.EXPIRED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Comments are closed");
        }

        Comment comment = new Comment();
        comment.setAuthor(author);
        comment.setPost(post);
        comment.setText(dto.getText());
        comment.setImage(dto.getImage());
        comment.setDate(LocalDateTime.now());

        Comment saved = commentRepository.save(comment);

        if (post.getStatus() == PostStatus.JUST_POSTED) {
            post.setStatus(PostStatus.FIRST_REACTION);
            postRepository.save(post);
        }

        CommentCreateResponseDTO res = new CommentCreateResponseDTO();
        res.setComment(mapToDTO(saved));
        res.setPostId(post.getPostId());
        res.setPostStatus(post.getStatus());

        return res;
    }

    public List<CommentResponseDTO> retrieveComments(Long postId) {
        postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepository.findByPostPostId(postId)
                .stream()
                .map(this::mapToDTO)
                .sorted((a, b) -> Long.compare(b.getScore(), a.getScore()))
                .toList();
    }

    public CommentResponseDTO updateComment(Long commentId, CommentRequestDTO dto, Long userId) {
        Comment existing = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAuthor = existing.getAuthor().getUserId().equals(userId);
        boolean isModerator = "MODERATOR".equals(user.getRole()) || "ADMIN".equals(user.getRole());

        if (!isAuthor && !isModerator) {
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

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isCommentAuthor = comment.getAuthor().getUserId().equals(userId);
        boolean isPostAuthor = comment.getPost().getAuthor().getUserId().equals(userId);
        boolean isModerator = "MODERATOR".equals(user.getRole()) || "ADMIN".equals(user.getRole());

        if (!isCommentAuthor && !isPostAuthor && !isModerator) {
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

        long likes = commentLikeRepository.countByCommentAndType(c, VoteType.LIKE);
        long dislikes = commentLikeRepository.countByCommentAndType(c, VoteType.DISLIKE);

        dto.setId(c.getCommId());
        dto.setPostId(c.getPost().getPostId());
        dto.setAuthorId(c.getAuthor().getUserId());
        dto.setAuthor(c.getAuthor().getUsername());
        dto.setText(c.getText());
        dto.setImage(c.getImage());
        dto.setCreatedAt(c.getDate().toString());
        dto.setLikes(likes);
        dto.setDislikes(dislikes);
        dto.setScore(likes - dislikes);
        dto.setAuthorScore(c.getAuthor().getScore());

        return dto;
    }
}