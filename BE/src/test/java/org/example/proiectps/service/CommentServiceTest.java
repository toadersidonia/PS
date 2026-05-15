package org.example.proiectps.service;

import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

//UNIT TESTING = verificam Service ul, dar FARA sa folosim baza de date reala
//Pt teste unitare: Junit + Mokito -> @ExtendWith, @Mock, verify(), when()

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {
    /*
    @Mock //creaza un obeict simulat
    private CommentRepository commentRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommentService commentService;

    private User author;
    private Post post;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        author = new User();
        author.setUserId(1L);
        author.setUsername("Alice");

        post = new Post();
        post.setPostId(1L);
        post.setTitle("Test Post");

        when(postRepository.findById(1L)).thenReturn(Optional.of(post)); //metoda mockito care spune ce sa returneze un mock cand e apelat
        when(userRepository.findById(1L)).thenReturn(Optional.of(author));
    }

    @Test
    void testCreateComment() {
        Comment comment = new Comment();
        comment.setText("Test comment");
        comment.setAuthor(author);
        comment.setPost(post);

        when(commentRepository.save(comment)).thenReturn(comment);
        //cand apeleaza save cu acest comment, returneaza comment ul

        Comment result = commentService.createComment(comment, 1L, 1L);

        assertEquals("Test comment", result.getText());
        assertEquals(author.getUserId(), result.getAuthor().getUserId());
        verify(commentRepository, times(1)).save(comment); //metoda mockito care veirifica daca un mock a fost apelat
    }

    @Test
    void testRetrieveAllComments() {
        Comment comment1 = new Comment();
        comment1.setCommId(1L);
        comment1.setText("Comment 1");
        comment1.setPost(post);

        Comment comment2 = new Comment();
        comment2.setCommId(2L);
        comment2.setText("Comment 2");
        comment2.setPost(post);

        List<Comment> comments = Arrays.asList(comment1, comment2);

        when(commentRepository.findByPostPostId(post.getPostId())).thenReturn(comments);

        List<Comment> result = commentService.retrieveComments(post.getPostId());

        assertEquals(2, result.size());
        verify(commentRepository, times(1)).findByPostPostId(post.getPostId());
        //verifica ca rpeository ul a fost apelat o singura data
    }

    @Test
    void testGetCommentById_Found() {
        Comment comment = new Comment();
        comment.setCommId(1L);
        comment.setText("Sample comment");

        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        Comment result = commentService.getCommentById(1L);

        assertEquals("Sample comment", result.getText());
        verify(commentRepository, times(1)).findById(1L);
    }

    @Test
    void testGetCommentById_NotFound() {
        when(commentRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> commentService.getCommentById(1L));

        assertEquals("Comment not found", exception.getMessage());
    }

    @Test
    void testUpdateComment_Authorized() {
        Comment comment = new Comment();
        comment.setCommId(1L);
        comment.setText("Old text");
        comment.setAuthor(author);

        when(commentRepository.save(comment)).thenReturn(comment);

        Comment result = commentService.updateComment(comment, 1L);

        assertEquals("Old text", result.getText());
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void testUpdateComment_Unauthorized() {
        Comment comment = new Comment();
        comment.setCommId(1L);
        comment.setText("Old text");
        comment.setAuthor(author);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> commentService.updateComment(comment, 2L));

        assertEquals("You are not allowed to edit this comment", exception.getMessage());
    }

    @Test
    void testDeleteComment_Authorized() {
        Comment comment = new Comment();
        comment.setCommId(1L);
        comment.setAuthor(author);

        Post mockPost = new Post();
        mockPost.setAuthor(new User());
        comment.setPost(mockPost);

        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        commentService.deleteComment(1L, 1L);

        verify(commentRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteComment_Unauthorized() {
        Comment comment = new Comment();
        comment.setCommId(1L);
        comment.setAuthor(author);

        Post mockPost = new Post();
        mockPost.setAuthor(new User());
        comment.setPost(mockPost);

        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> commentService.deleteComment(1L, 2L));

        assertEquals("You are not allowed to delete this comment", exception.getMessage());
    }
    */
}
