package org.example.proiectps.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

import org.example.proiectps.enums.PostStatus;


@Entity
@Table (name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor


public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User author;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String text;
    @Column(nullable = false)
    private LocalDateTime date;
    private String image;
    private PostStatus status=PostStatus.JUST_POSTED;

    ///TAGS
    @ManyToMany
    @JoinTable(
            name = "post_tags", //numele tabelului intermediar
            joinColumns = @JoinColumn(name = "post_id"), //coloana care refera postul
            inverseJoinColumns = @JoinColumn(name = "tag_id") //coloana care refera tagul
    )

    @JsonIgnore
    private List<Tag> tags;


}

