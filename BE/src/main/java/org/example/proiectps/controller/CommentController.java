package org.example.proiectps.controller;

import org.example.proiectps.dto.CommentRequestDTO;
import org.example.proiectps.dto.CommentResponseDTO;
import org.example.proiectps.dto.VoteResponseDTO;
import org.example.proiectps.enums.VoteType;
import org.example.proiectps.service.CommentService;
import org.example.proiectps.service.CommentVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentVoteService commentVoteService;

    // CREATE
    @PostMapping
    public CommentResponseDTO createComment(
            @RequestParam Long postId,
            @RequestParam Long userId,
            @RequestBody CommentRequestDTO dto
    ) {
        return commentService.createComment(dto, postId, userId);
    }

    // GET BY POST
    @GetMapping("/post/{postId}")
    public List<CommentResponseDTO> getPostComments(@PathVariable Long postId) {
        return commentService.retrieveComments(postId);
    }

    // UPDATE
    @PutMapping("/{commentId}")
    public CommentResponseDTO editComment(
            @PathVariable Long commentId,
            @RequestBody CommentRequestDTO dto,
            @RequestParam Long userId
    ) {
        return commentService.updateComment(commentId, dto, userId);
    }

    // DELETE
    @DeleteMapping("/{commentId}")
    public void deleteComment(
            @PathVariable Long commentId,
            @RequestParam Long userId
    ) {
        commentService.deleteComment(commentId, userId);
    }

    // GET ONE
    @GetMapping("/{commentId}")
    public CommentResponseDTO getComment(@PathVariable Long commentId) {
        return commentService.getCommentById(commentId);
    }

//    @PutMapping("/{commentId}/vote")
//    public CommentResponseDTO vote(
//            @PathVariable Long commentId,
//            @RequestParam Long userId,
//            @RequestParam VoteType type
//    ) {
//        commentVoteService.vote(commentId, userId, type);
//        return commentService.getCommentById(commentId);
//    }
    @PutMapping("/{commentId}/vote")
    public VoteResponseDTO vote(
            @PathVariable Long commentId,
            @RequestParam Long userId,
            @RequestParam VoteType type
    ) {
        return commentVoteService.vote(commentId, userId, type);
    }
}