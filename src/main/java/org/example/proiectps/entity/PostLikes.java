package org.example.proiectps.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table (name = "postLikes")
@Data
@NoArgsConstructor
@AllArgsConstructor


public class PostLikes {

    @EmbeddedId
    private PostLikeId id;


    @ManyToOne
    @MapsId("userId") //leaga userId din PostLikedId
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @MapsId("postId") // leaga postId din PostLikeId
    @JoinColumn(name = "post_id")
    private Posts post;

    private Boolean liked; // true=like, false=dislike, null=fara reactie

}
