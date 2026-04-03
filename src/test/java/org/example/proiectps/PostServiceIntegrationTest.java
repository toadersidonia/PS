package org.example.proiectps;

import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.PostStatus;
import org.example.proiectps.service.PostService;
import org.example.proiectps.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostServiceIntegrationTest {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService; // avem nevoie de user pentru autor

    // helper pentru user
    private User createTestUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setPassword("1234");
        user.setEmail(username + "@test.com");
        user.setRole("user");
        user.setScore(0L);
        user.setBanned(false);
        return userService.createUser(user);
    }

    // helper pentru post
    private Post createTestPost(User author, String title) {
        Post post = new Post();
        post.setTitle(title);
        post.setText("Text for " + title);
        post.setImage(title + ".png");
        post.setDate(LocalDateTime.now());
        post.setAuthor(author);
        post.setStatus(PostStatus.JUST_POSTED);
        return postService.addPost(post);
    }

    // ------------------ CREATE ------------------
    @Test
    void createPost_shouldSavePostInDB() {
        User author = createTestUser("rares");
        Post post = createTestPost(author, "My first post");

        assertNotNull(post.getPostId());
        assertEquals("My first post", post.getTitle());
        assertEquals(author.getUserId(), post.getAuthor().getUserId());
    }

    // ------------------ GET ALL ------------------
    @Test
    void getAllPosts_shouldReturnList() {
        User author = createTestUser("alex");
        createTestPost(author, "Post 1");
        createTestPost(author, "Post 2");

        List<Post> posts = postService.getAllPosts();

        assertNotNull(posts);
        assertTrue(posts.size() >= 2);
    }

    // ------------------ GET BY ID ------------------
    @Test
    void getPostById_shouldReturnPost() {
        User author = createTestUser("ion");
        Post saved = createTestPost(author, "Post GetById");

        Post found = postService.getPostById(saved.getPostId());
        assertNotNull(found);
        assertEquals("Post GetById", found.getTitle());
    }

    @Test
    void getPostById_shouldReturnNullWhenNotFound() {
        Post found = postService.getPostById(9999L);
        assertNull(found);
    }

    // ------------------ UPDATE ------------------
    @Test
    void updatePost_shouldModifyPost_WhenOwner() {
        User author = createTestUser("maria");
        Post saved = createTestPost(author, "Original Title");

        Post update = new Post();
        update.setTitle("Updated Title");
        update.setText("Updated Text");
        update.setImage("updated.png");
        update.setDate(LocalDateTime.now());
        update.setAuthor(author);

        Post result = postService.updatePost(update, author.getUserId());

        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Text", result.getText());
        assertEquals("updated.png", result.getImage());
    }

    @Test
    void updatePost_shouldThrow_WhenNotOwner() {
        User author = createTestUser("alex");
        Post saved = createTestPost(author, "Original Title");

        Post update = new Post();
        update.setTitle("Hack Title");
        update.setText("Hack Text");
        update.setImage("hack.png");
        update.setDate(LocalDateTime.now());
        update.setAuthor(author);

        User anotherUser = createTestUser("someone_else");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                postService.updatePost(update, anotherUser.getUserId())
        );
        assertEquals("You are not allowed to update this post", exception.getMessage());
    }

    // ------------------ DELETE ------------------
    @Test
    void deletePost_shouldRemovePost_WhenOwner() {
        User author = createTestUser("rares");
        Post saved = createTestPost(author, "Post to delete");

        postService.deletePost(saved.getPostId(), author.getUserId());

        Post deleted = postService.getPostById(saved.getPostId());
        assertNull(deleted);
    }

    @Test
    void deletePost_shouldThrow_WhenNotOwner() {
        User author = createTestUser("ion");
        Post saved = createTestPost(author, "Post to delete");

        User anotherUser = createTestUser("hacker");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                postService.deletePost(saved.getPostId(), anotherUser.getUserId())
        );
        assertEquals("You are not allowed to delete this post", exception.getMessage());
    }
}