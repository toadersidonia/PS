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
//
//    @PostMapping("/create")
//    public Comment createComment(@RequestBody Comment comment) {
//        return commentService.createComment(comment);
//    }
//
////    @GetMapping
////    public List<Comment> getAllComments() {
////
////    }
//
//    @PutMapping("/edit")
//    public Comment editComment(@RequestBody Comment comment, @RequestParam int userId) {
//        return commentService.updateComment(comment, userId);
//    }
//
//    @DeleteMapping("/{commentId}")
//    public void deleteComment(@PathVariable int commentId, @RequestParam int userId) {
//        //user id o sa vina din autentificarea cu token uri
//        commentService.deleteComment(commentId, userId);
//    }
}
