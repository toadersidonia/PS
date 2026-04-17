package org.example.proiectps.controller;

import org.example.proiectps.entity.Post;
import org.example.proiectps.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private PostService postService;

    // CREATE
    @PostMapping
    public Post addPost(@RequestBody Post post, @RequestParam Long userId) {
        return postService.addPost(post, userId);
    }

    // READ ALL
    @GetMapping
    List<Post> getAllPosts(){ return postService.getAllPosts(); }

    // READ BY ID
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    //UPDATE
    @PutMapping("/{id}")
    public Post updatePost(
            @PathVariable Long id,
            @RequestBody Post post,
            @RequestParam Long userId
    ) {
        post.setPostId(id);
        Post updatedPost = postService.updatePost(post, userId);
        //return "Post with ID " + updatedPost.getPostId() + " was updated";
        return post;
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
