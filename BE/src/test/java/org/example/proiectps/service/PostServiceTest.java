package org.example.proiectps.service;

import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)  //spunem ca JUnit5 sa foloseasca Mockito
class PostServiceTest {
    /*
    @Mock  //
    private PostRepository postRepository; //este acum un mock

    //Mokito se ocupa sa creeze mock-uri si sa le injecteze automat in serviviul nostru
    @InjectMocks
    private PostService postService;


    //Aceste 2 metode creeaza rapid obiecte ca sa nu scriem cod de fiecare data
    // helper pentru User
    private User buildUser(Long id) {
        User u = new User();
        u.setUserId(id);
        return u;
    }

    // helper pentru Post
    private Post buildPost(Long id, Long authorId) {
        Post p = new Post();
        p.setPostId(id);
        p.setAuthor(buildUser(authorId));
        p.setTitle("Title " + id);
        p.setText("Text " + id);
        p.setImage("image" + id + ".png");
        p.setDate(LocalDateTime.now());
        return p;
    }

    @Test
    void addPost_ShouldSavePost() {
        Post p = buildPost(1L, 1L); //cream un post
        when(postRepository.save(p)).thenReturn(p);

        Post result = postService.addPost(p, 2L); //apelam metoda de testare

        assertNotNull(result);
        assertEquals("Title 1", result.getTitle()); //verifica ca titlul e corect
        verify(postRepository).save(p); //confirma ca repositoryul a fost apelat exact o data
    }

    @Test
    void getAllPosts_ShouldReturnPosts() {
        //facem 2 posturi
        List<Post> posts = List.of(buildPost(1L, 1L), buildPost(2L, 2L));
        when(postRepository.findAllByOrderByDateDesc()).thenReturn(posts);

        List<Post> result = postService.getAllPosts();

        assertEquals(2, result.size());  //verificam daca lista are 2 elemente
        assertEquals("Title 1", result.get(0).getTitle());
    }

    @Test
    void getPostById_ShouldReturnPost_WhenExists() {
        Post p = buildPost(1L, 1L);
        when(postRepository.findById(1L)).thenReturn(Optional.of(p));

        Post result = postService.getPostById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getPostId());
    }

    @Test
    void getPostById_ShouldReturnNull_WhenNotFound() {
        when(postRepository.findById(2L)).thenReturn(Optional.empty());

        Post result = postService.getPostById(2L);
        assertNull(result);
    }

    @Test
    void updatePost_ShouldUpdate_WhenOwner() {
        User author = buildUser(1L);
        Post existing = buildPost(1L, 1L);
        existing.setAuthor(author);

        Post update = buildPost(1L, 1L);
        update.setTitle("Updated Title");
        update.setText("Updated Text");

        when(postRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(postRepository.save(any(Post.class))).thenReturn(update);

        Post result = postService.updatePost(update, 1L);

        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Text", result.getText());
    }

    @Test
    void updatePost_ShouldThrow_WhenNotOwner() {
        Post existing = buildPost(1L, 1L);
        existing.setAuthor(buildUser(1L));

        Post update = buildPost(1L, 1L);

        when(postRepository.findById(1L)).thenReturn(Optional.of(existing));

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                postService.updatePost(update, 2L));
        assertEquals("You are not allowed to update this post", exception.getMessage());
    }

    @Test
    void deletePost_ShouldDelete_WhenOwner() {
        Post existing = buildPost(1L, 1L);
        existing.setAuthor(buildUser(1L));

        when(postRepository.findById(1L)).thenReturn(Optional.of(existing));

        postService.deletePost(1L, 1L);

        verify(postRepository).delete(existing);
    }

    @Test
    void deletePost_ShouldThrow_WhenNotOwner() {
        Post existing = buildPost(1L, 1L);
        existing.setAuthor(buildUser(1L));

        when(postRepository.findById(1L)).thenReturn(Optional.of(existing));

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                postService.deletePost(1L, 2L));
        assertEquals("You are not allowed to delete this post", exception.getMessage());
    }
    */
}