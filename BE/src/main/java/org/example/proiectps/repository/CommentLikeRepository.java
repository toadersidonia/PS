package org.example.proiectps.repository;

import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.CommentLike;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.VoteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByUserAndComment(User user, Comment comment);

    long countByCommentAndType(Comment comment, VoteType type);

    long countByCommentAuthorUserIdAndType(Long userId, VoteType type);

    long countByUser_UserIdAndType(Long userId, VoteType type);


}