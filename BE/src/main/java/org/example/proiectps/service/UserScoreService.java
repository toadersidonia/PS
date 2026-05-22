package org.example.proiectps.service;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.example.proiectps.enums.VoteType;
import org.example.proiectps.repository.CommentLikeRepository;
import org.example.proiectps.repository.PostLikeRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserScoreService {

    private final PostLikeRepository postLikeRepository;
    private final CommentLikeRepository commentLikeRepository;


    public double getUserScore(Long userId) {

        long postLikes = postLikeRepository.countByPostAuthorUserIdAndLiked(userId, true);
        long postDislikes = postLikeRepository.countByPostAuthorUserIdAndLiked(userId, false);

        long commentLikesReceived = commentLikeRepository.countByCommentAuthorUserIdAndType(userId, VoteType.LIKE);
        long commentDislikesReceived = commentLikeRepository.countByCommentAuthorUserIdAndType(userId, VoteType.DISLIKE);

        long commentDislikesGiven =
                commentLikeRepository.countByUser_UserIdAndType(userId, VoteType.DISLIKE);

        double score =
                postLikes * 2.5
                        - postDislikes * 1.5
                        + commentLikesReceived * 5.0
                        - commentDislikesReceived * 2.5
                        - commentDislikesGiven * 1.5; //  NOU

        return score;
    }
}