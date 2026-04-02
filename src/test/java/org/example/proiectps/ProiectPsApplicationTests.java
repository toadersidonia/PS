package org.example.proiectps;

import org.example.proiectps.entity.User;
import org.example.proiectps.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProiectPsApplicationTests {

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() {
    }

    @Test
    void createUser_shouldSaveUserInDB() {
        User user = new User();
        user.setUsername("rares");
        user.setPassword("1234");
        user.setEmail("rares@test.com");
        user.setRole("user");
        user.setScore(0L);
        user.setBanned(false);

        User saved = userService.createUser(user);

        assertNotNull(saved.getUserId());
        assertEquals("rares", saved.getUsername());
        assertEquals("rares@test.com", saved.getEmail());
    }

    @Test
    void getAllUsers_shouldReturnList() {
        List<User> users = userService.getAllUsers();
        assertNotNull(users);
    }

    @Test
    void getUserById_shouldReturnUser() {
        User user = new User();
        user.setUsername("alex");
        user.setPassword("5678");
        user.setEmail("alex@test.com");
        user.setRole("user");
        user.setScore(0L);
        user.setBanned(false);

        User saved = userService.createUser(user);
        Optional<User> found = userService.getUserById(saved.getUserId());

        assertTrue(found.isPresent());
        assertEquals("alex", found.get().getUsername());
    }

    @Test
    void updateUser_shouldModifyUser() {
        User user = new User();
        user.setUsername("ion");
        user.setPassword("pass");
        user.setEmail("ion@test.com");
        user.setRole("user");
        user.setScore(0L);
        user.setBanned(false);

        User saved = userService.createUser(user);

        User updated = new User();
        updated.setUsername("ion_updated");
        updated.setPassword("newpass");
        updated.setEmail("ion_updated@test.com");
        updated.setRole("admin");
        updated.setScore(10L);
        updated.setBanned(false);

        User result = userService.updateUser(saved.getUserId(), updated);

        assertEquals("ion_updated", result.getUsername());
        assertEquals("admin", result.getRole());
        assertEquals(10L, result.getScore());
    }

    @Test
    void deleteUser_shouldRemoveUser() {
        User user = new User();
        user.setUsername("maria");
        user.setPassword("pass");
        user.setEmail("maria@test.com");
        user.setRole("user");
        user.setScore(0L);
        user.setBanned(false);

        User saved = userService.createUser(user);
        Long id = saved.getUserId();

        userService.deleteUser(id);

        Optional<User> deleted = userService.getUserById(id);
        assertFalse(deleted.isPresent());
    }
}