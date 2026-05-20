package org.example.proiectps.service;

import org.example.proiectps.dto.CommentResponseDTO;
import org.example.proiectps.dto.VoteResponseDTO;
import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.CommentLike;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.VoteType;
import org.example.proiectps.repository.CommentLikeRepository;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CommentVoteService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentLikeRepository repo;

    @Autowired
    private CommentService commentService;

    public VoteResponseDTO vote(Long commentId, Long userId, VoteType newType) {

        User voter = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (comment.getAuthor().getUserId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot vote own comment"
            );
        }

        User author = comment.getAuthor();

        if (author.getScore() == null) author.setScore(0.0);
        if (voter.getScore() == null) voter.setScore(0.0);

        CommentLike vote = repo.findByUserAndComment(voter, comment).orElse(null);

        VoteType oldType = (vote == null ? null : vote.getType());

        if (oldType == newType) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Already voted"
            );
        }

        // =========================
        // AUTHOR SCORE LOGIC
        // =========================
        double authorDelta = 0.0;

        // undo old vote effect
        if (oldType == VoteType.LIKE) {
            authorDelta -= 5.0;
        }
        if (oldType == VoteType.DISLIKE) {
            authorDelta += 2.5;
        }

        // apply new vote effect
        if (newType == VoteType.LIKE) {
            authorDelta += 5.0;
        }
        if (newType == VoteType.DISLIKE) {
            authorDelta -= 2.5;
        }

        author.setScore(author.getScore() + authorDelta);

        // =========================
        // VOTER SCORE LOGIC
        // =========================
        double voterDelta = 0.0;

        // undo old DISLIKE penalty
        if (oldType == VoteType.DISLIKE) {
            voterDelta += 1.5;
        }

        // apply new DISLIKE penalty
        if (newType == VoteType.DISLIKE) {
            voterDelta -= 1.5;
        }

        voter.setScore(voter.getScore() + voterDelta);

        // =========================
        // SAVE VOTE
        // =========================
        if (vote == null) {
            vote = new CommentLike();
            vote.setUser(voter);
            vote.setComment(comment);
        }

        vote.setType(newType);
        repo.save(vote);

        userRepository.save(author);
        userRepository.save(voter);

        // =========================
        // RESPONSE
        // =========================
        VoteResponseDTO res = new VoteResponseDTO();

        CommentResponseDTO commentDTO =
                commentService.getCommentById(commentId);

        res.setComment(commentDTO);
        res.setVoterScore(voter.getScore());

        return res;
    }
}