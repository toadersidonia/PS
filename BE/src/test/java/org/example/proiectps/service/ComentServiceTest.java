package org.example.proiectps.service;

import org.example.proiectps.dto.CommentCreateResponseDTO;
import org.example.proiectps.dto.CommentRequestDTO;
import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.PostStatus;
import org.example.proiectps.repository.CommentLikeRepository;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ComentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CommentLikeRepository commentLikeRepository;

    @InjectMocks
    private CommentService commentService;

    private User user;
    private Post post;
    private CommentRequestDTO dto;

    @BeforeEach
    void setup() {

        user = new User();
        user.setUserId(1L);
        user.setUsername("alex");

        post = new Post();
        post.setPostId(10L);
        post.setStatus(PostStatus.JUST_POSTED);
        post.setAuthor(user);

        dto = new CommentRequestDTO();
        dto.setText("Salut");
        dto.setImage("img.png");
    }

    @Test
    void createComment_shouldCreateCommentSuccessfully() {

        // arrange
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(postRepository.findById(10L))
                .thenReturn(Optional.of(post));

        when(commentRepository.save(any(Comment.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // act
        CommentCreateResponseDTO result =
                commentService.createComment(dto, 10L, 1L);

        // assert
        assertNotNull(result);

        assertEquals("Salut", result.getComment().getText());

        assertEquals(PostStatus.FIRST_REACTION,
                result.getPostStatus());

        verify(commentRepository, times(1))
                .save(any(Comment.class));

        verify(postRepository, times(1))
                .save(post);
    }
}