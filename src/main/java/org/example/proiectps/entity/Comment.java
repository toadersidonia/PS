package org.example.proiectps.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Table (name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User author;

    @ManyToOne
    @JoinColumn(name="post_id")
    private Post post;

    @Column(nullable = false)
    private String text;

    private String image;

    @Column(nullable = false)
    private LocalDateTime date = LocalDateTime.now();
}
