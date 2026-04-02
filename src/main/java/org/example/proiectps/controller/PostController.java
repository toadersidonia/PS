package org.example.proiectps.controller;

import org.example.proiectps.entity.Post;
import org.example.proiectps.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller("/posts")

public class PostController {
    @Autowired
    private PostService postService;

    // CREATE
    @PostMapping("/createPost")
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    // READ ALL
    @GetMapping("/posts")
    List<Post> getAllPosts(){ return postService.getAllPosts(); }

    // READ BY ID
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Post updatePost(
            @PathVariable Long id,
            @RequestBody Post post,
            @RequestParam Long userId
    ) {
        post.setPostId(id);
        return postService.updatePost(post, userId);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deletePost(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        postService.deletePost(id, userId);
    }


}
