package org.example.proiectps;

import org.example.proiectps.entity.Comment;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.PostStatus;
import org.example.proiectps.repository.CommentRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.UserRepository;
import org.example.proiectps.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

//INTEGRAITON TEST = verifica daca Servic eul funcitoneaza corect cu baza de date reala (Service + Repository + DB)
//JUnit5 - framework de baza pt testare - @Test, assertEquals, assertNotNull, @BefroeEach, @AfterEach...
//Pt integration: Junit + SpringBoot: @SpringBootTets, @Transactional, @Autowired

@SpringBootTest //se porneste aplicatia completa
@Transactional //dupa fiecare test, anuleaza modificarile (curata datele)
class CommentServiceIntegrationTest {
    /*
    @Autowired
    private CommentService commentService; //folosim Service real, nu mock

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    private User testUser;
    private Post testPost;

    private User createTestUser(String username) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(username + "@test.com");
        user.setPassword("password123");
        user.setRole("USER");
        user.setScore(0L);
        user.setBanned(false);
        return userRepository.save(user);
    }

    private Post createTestPost(User author, String title) {
        Post post = new Post();
        post.setTitle(title);
        post.setText("Content for " + title);
        post.setImage(title + ".png");
        post.setDate(LocalDateTime.now());
        post.setStatus(PostStatus.JUST_POSTED);
        post.setAuthor(author);
        return postRepository.save(post);
    }

    private Comment createTestComment(String text, User author, Post post) {
        Comment comment = new Comment();
        comment.setText(text);
        comment.setDate(LocalDateTime.now());
        comment.setAuthor(author);
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    //se ruleaza inainte de fiecare test
    @BeforeEach
    void setUp() {
        //curata baza de date
        commentRepository.deleteAll();
        postRepository.deleteAll();
        userRepository.deleteAll();

        testUser = createTestUser("commentTester");
        testPost = createTestPost(testUser, "Test Post for Comments");
    }

    /**
    Structura unui test:
    Arrange - pregatim datele pt test
    Act - apelam metoda testata
    Assert - compara rezultatul cu ce astetam de fapt

    Assert = spune "ma astept ca X sa fie egal cu Y, daca nu e, testul esueaza"
     **/

    /*
    @Test
    void createComment_shouldSaveCommentInDatabase() {
        Comment comment = new Comment();
        comment.setText("This is an integration test comment");

        Comment savedComment = commentService.createComment(comment, testPost.getPostId(), testUser.getUserId());

        assertNotNull(savedComment.getCommId());
        assertEquals("This is an integration test comment", savedComment.getText());
        assertEquals(testUser.getUserId(), savedComment.getAuthor().getUserId());
        assertEquals(testPost.getPostId(), savedComment.getPost().getPostId());
        assertNotNull(savedComment.getDate());

        Comment foundInDb = commentRepository.findById(savedComment.getCommId()).orElse(null);
        assertNotNull(foundInDb);
        assertEquals(savedComment.getText(), foundInDb.getText());
    }

    @Test
    void createComment_shouldThrowException_WhenPostNotFound() {
        Comment comment = new Comment();
        comment.setText("This comment should fail");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.createComment(comment, 9999L, testUser.getUserId())
        );
        assertEquals("Post not found", exception.getMessage());
    }

    @Test
    void createComment_shouldThrowException_WhenUserNotFound() {
        Comment comment = new Comment();
        comment.setText("This comment should fail");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.createComment(comment, testPost.getPostId(), 9999L)
        );
        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void retrieveComments_shouldReturnAllCommentsForPost() {
        createTestComment("First comment", testUser, testPost);
        createTestComment("Second comment", testUser, testPost);
        createTestComment("Third comment", testUser, testPost);

        List<Comment> comments = commentService.retrieveComments(testPost.getPostId());

        assertEquals(3, comments.size());
        assertTrue(comments.stream().anyMatch(c -> c.getText().equals("First comment")));
        assertTrue(comments.stream().anyMatch(c -> c.getText().equals("Second comment")));
        assertTrue(comments.stream().anyMatch(c -> c.getText().equals("Third comment")));
    }

    @Test
    void retrieveComments_shouldReturnEmptyList_WhenNoComments() {
        List<Comment> comments = commentService.retrieveComments(testPost.getPostId());

        assertNotNull(comments);
        assertEquals(0, comments.size());
    }

    @Test
    void getCommentById_shouldReturnComment_WhenExists() {
        Comment comment = createTestComment("Find me by ID", testUser, testPost);

        Comment found = commentService.getCommentById(comment.getCommId());

        assertNotNull(found);
        assertEquals(comment.getCommId(), found.getCommId());
        assertEquals("Find me by ID", found.getText());
        assertEquals(testUser.getUserId(), found.getAuthor().getUserId());
    }

    @Test
    void getCommentById_shouldThrowException_WhenNotFound() {
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.getCommentById(9999L)
        );
        assertEquals("Comment not found", exception.getMessage());
    }

    @Test
    void updateComment_shouldModifyComment_WhenAuthorized() {
        Comment originalComment = createTestComment("Original text", testUser, testPost);

        Comment updateComment = new Comment();
        updateComment.setCommId(originalComment.getCommId());
        updateComment.setText("Updated text");
        updateComment.setImage("updated-image.png");

        Comment updated = commentService.updateComment(updateComment, testUser.getUserId());

        assertEquals("Updated text", updated.getText());
        assertEquals("updated-image.png", updated.getImage());

        Comment fromDb = commentRepository.findById(originalComment.getCommId()).orElse(null);
        assertNotNull(fromDb);
        assertEquals("Updated text", fromDb.getText());
    }

    @Test
    void updateComment_shouldThrowException_WhenNotAuthorized() {
        Comment originalComment = createTestComment("Original text", testUser, testPost);
        User otherUser = createTestUser("otherUser");

        Comment updateComment = new Comment();
        updateComment.setCommId(originalComment.getCommId());
        updateComment.setText("Hacked text");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.updateComment(updateComment, otherUser.getUserId())
        );
        assertEquals("You are not allowed to edit this comment", exception.getMessage());

        Comment unchanged = commentRepository.findById(originalComment.getCommId()).orElse(null);
        assertNotNull(unchanged);
        assertEquals("Original text", unchanged.getText());
    }

    @Test
    void updateComment_shouldThrowException_WhenCommentNotFound() {
        Comment updateComment = new Comment();
        updateComment.setCommId(9999L);
        updateComment.setText("This should fail");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.updateComment(updateComment, testUser.getUserId())
        );
        assertEquals("Comment not found", exception.getMessage());
    }

    @Test
    void deleteComment_shouldRemoveComment_WhenAuthorized() {
        Comment commentToDelete = createTestComment("Delete me", testUser, testPost);
        Long commentId = commentToDelete.getCommId();

        assertTrue(commentRepository.findById(commentId).isPresent());

        commentService.deleteComment(commentId, testUser.getUserId());

        assertFalse(commentRepository.findById(commentId).isPresent());
    }

    @Test
    void deleteComment_shouldThrowException_WhenNotAuthorized() {
        Comment commentToDelete = createTestComment("Don't delete me", testUser, testPost);
        User otherUser = createTestUser("anotherUser");

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.deleteComment(commentToDelete.getCommId(), otherUser.getUserId())
        );
        assertEquals("You are not allowed to delete this comment", exception.getMessage());

        assertTrue(commentRepository.findById(commentToDelete.getCommId()).isPresent());
    }

    @Test
    void deleteComment_shouldThrowException_WhenCommentNotFound() {
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                commentService.deleteComment(9999L, testUser.getUserId())
        );
        assertEquals("Comment not found", exception.getMessage());
    }

    @Test
    void retrieveComments_shouldReturnCommentsFromMultipleUsers() {
        User secondUser = createTestUser("secondUser");

        createTestComment("Comment from user1", testUser, testPost);
        createTestComment("Comment from user2", secondUser, testPost);

        List<Comment> comments = commentService.retrieveComments(testPost.getPostId());

        assertEquals(2, comments.size());
        assertTrue(comments.stream().anyMatch(c -> c.getText().equals("Comment from user1")));
        assertTrue(comments.stream().anyMatch(c -> c.getText().equals("Comment from user2")));
    }
    */
}