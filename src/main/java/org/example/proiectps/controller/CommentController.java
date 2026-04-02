package org.example.proiectps.controller;

import org.example.proiectps.entity.Comment;
import org.example.proiectps.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody Long postId, @RequestParam Long userId, @RequestParam Comment comment) {
        return commentService.createComment(comment, postId, userId);
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getPostComments(@PathVariable Long postId) {
        return commentService.retrieveComments(postId);
    }

    @PutMapping("/{commentId}")
    //la fel ca la delete commment in legatura cu userId
    public Comment editComment(@PathVariable Long commentId, @RequestBody Comment comment, @RequestParam Long userId) {
        comment.setCommId(commentId);
        return commentService.updateComment(comment, userId);
    }

    @DeleteMapping("/{commentId}")
    //mometan trimtiem userId din request, dar cand facem partea de securitate va fi extras din sesiuena curenta
    public void deleteComment(@PathVariable Long commentId, @RequestParam Long userId) {
        commentService.deleteComment(commentId, userId);
    }

    @GetMapping("/{commentId}")
    public Comment getComment(@PathVariable Long commentId) {
        return commentService.getCommentById(commentId);
    }
}
