package org.example.proiectps.service;

import org.example.proiectps.entity.Comment;
import org.example.proiectps.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
//
//    public Comment createComment(Comment comment) {
//        return commentRepository.save(comment);
//    }
//
//    public void deleteComment(int commentId, int userId) {
////        Comment comment = commentRepository.findById(Long.valueOf(commentId))
////                .orElseThrow(() -> new RuntimeException("Comment not found"));
////
////        //doar autorul unui comentariu poate sa il stearga?
////        if(!comment.getAuthor().getUserId().equals(userId)) {
////            throw new RuntimeException("You are not allowed to delete this comment");
////        }
////
////        commentRepository.deleteById(Long.valueOf(commentId));
//    }
//
//    public Comment updateComment(Comment comment, int userId) {
////        //doar autorul unui comentariu poate sa l editeze
////        if (!comment.getAuthor().getUserId().equals(userId)) {
////            throw new RuntimeException("You are not allowed to edit this comment");
////        }
////
////        return commentRepository.save(comment);
//    }
}
