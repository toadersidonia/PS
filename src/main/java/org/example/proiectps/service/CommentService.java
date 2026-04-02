package org.example.proiectps.service;

import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment createComment(Comment comment, Long postId, Long userId) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if ((comment.getText() == null || comment.getText().trim().isEmpty()) && (comment.getImage() == null || comment.getImage().isEmpty())) {
            throw new RuntimeException("Comment must have text or image");
        }

        return commentRepository.save(comment);
    }

    public List<Comment> retrieveComments(Long postId) {
        //ca sa luam toate comentariile avem nevoie doar de postid
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepository.findByPostPostId(postId);
    }

    public Comment updateComment(Comment updatedComment, Long userId) {
        Comment existing = commentRepository.findById(updatedComment.getCommId())
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        //doar autorul unui comentariu poate sa l editeze
        if (!existing.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to edit this comment");
        }

        existing.setText(updatedComment.getText());
        existing.setImage(updatedComment.getImage());

        return commentRepository.save(existing);
    }

    public void deleteComment(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        //doar autorul unui comentariu poate sa il stearga? sau si cel care a creat postarea
        if(!comment.getAuthor().getUserId().equals(userId) || !comment.getPost().getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to delete this comment");
        }
        commentRepository.deleteById(commentId);
    }

    public Comment getCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }
}
