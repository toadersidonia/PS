package org.example.proiectps.repository;

import org.example.proiectps.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PostLikeRepository
        extends JpaRepository<PostLike, Long> {

    ///verifica daca userul a votat deja
    boolean existsByUserUserIdAndPostPostId(
            Long userId,
            Long postId
    );

    ///numara like/dislike
    long countByPostPostIdAndLiked(
            Long postId,
            Boolean liked
    );

    Optional<PostLike> findByUserUserIdAndPostPostId(Long userId, Long postId);

    long countByPostAuthorUserIdAndLiked(Long userId, boolean liked);



}