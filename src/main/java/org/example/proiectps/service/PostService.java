package org.example.proiectps.service;


import org.example.proiectps.entity.Post;
import org.example.proiectps.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts()
    {
        List<Post> posts = postRepository.findAllByOrderByDateDesc();
        return posts;
    }

    public Post getPostById(Long id)
    {
        Optional<Post> post = postRepository.findById(id);

        if(post.isPresent())
        {
            return post.get();
        }

        return null;

    }

    public Post updatePost(Post post, Long userId) {

        Post existingPost = postRepository.findById(post.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // verificare owner
        if (!existingPost.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to update this post");
        }

        // update
        existingPost.setTitle(post.getTitle());
        existingPost.setText(post.getText());
        existingPost.setDate(post.getDate());
        existingPost.setImage(post.getImage());

        return postRepository.save(existingPost);
    }

    public void deletePost(Long id, Long userId) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if(!existingPost.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("You are not allowed to delete this post");
        }

        postRepository.delete(existingPost);
    }





}
