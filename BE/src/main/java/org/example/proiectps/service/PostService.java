package org.example.proiectps.service;

import lombok.RequiredArgsConstructor;
import org.example.proiectps.dto.PostRequestDTO;
import org.example.proiectps.dto.PostResponseDTO;
import org.example.proiectps.entity.Post;
import org.example.proiectps.entity.PostLike;
import org.example.proiectps.entity.Tag;
import org.example.proiectps.entity.User;
import org.example.proiectps.enums.PostStatus;
import org.example.proiectps.repository.PostLikeRepository;
import org.example.proiectps.repository.PostRepository;
import org.example.proiectps.repository.TagRepository;
import org.example.proiectps.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostLikeRepository postLikeRepository;
    private final TagRepository tagRepository;

    // CREATE
    public PostResponseDTO addPost(PostRequestDTO dto, Long userId) {

        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setAuthor(author);
        post.setTitle(dto.getTitle());
        post.setText(dto.getText());
        post.setImage(dto.getImage());

        List<Tag> postTags =
                (dto.getTags() == null ? List.<String>of() : dto.getTags())
                        .stream()
                        .map(tagName -> {

                            return tagRepository.findByName(tagName)
                                    .orElseGet(() -> {
                                        Tag newTag = new Tag();
                                        newTag.setName(tagName);

                                        return tagRepository.save(newTag);
                                    });

                        })
                        .toList();

        post.setTags(postTags);

        post.setDate(LocalDateTime.now());

        long likes = postLikeRepository
                .countByPostPostIdAndLiked(
                        post.getPostId(),
                        true
                );

        long dislikes = postLikeRepository
                .countByPostPostIdAndLiked(
                        post.getPostId(),
                        false
                );

        double score = likes * 2.5 - dislikes * 1.5;

        return mapToDTO(postRepository.save(post));
    }

    // READ ALL
    public List<PostResponseDTO> getAllPosts() {
        return postRepository.findAllByOrderByDateDesc()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // READ BY ID
    public PostResponseDTO getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return mapToDTO(post);
    }

    // UPDATE
    public PostResponseDTO updatePost(Long id, PostRequestDTO dto, Long userId) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAuthor = post.getAuthor().getUserId().equals(userId);
        boolean isModerator = "MODERATOR".equals(user.getRole()) || "ADMIN".equals(user.getRole());

        if (!isAuthor && !isModerator) {
            throw new RuntimeException("Not allowed");
        }

        post.setTitle(dto.getTitle());
        post.setText(dto.getText());
        post.setImage(dto.getImage());

        List<Tag> postTags =
                (dto.getTags() == null ? List.<String>of() : dto.getTags())
                        .stream()
                        .map(tagName -> {

                            return tagRepository.findByName(tagName)
                                    .orElseGet(() -> {
                                        Tag newTag = new Tag();
                                        newTag.setName(tagName);

                                        return tagRepository.save(newTag);
                                    });

                        })
                        .toList();

        post.setTags(postTags);

        return mapToDTO(postRepository.save(post));
    }

    // DELETE
    public void deletePost(Long id, Long userId) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAuthor = post.getAuthor().getUserId().equals(userId);
        boolean isModerator = "MODERATOR".equals(user.getRole()) || "ADMIN".equals(user.getRole());

        if (!isAuthor && !isModerator) {
            throw new RuntimeException("Not allowed");
        }

        postRepository.delete(post);
    }

    // MAPPER
    private PostResponseDTO mapToDTO(Post post) {

        PostResponseDTO dto = new PostResponseDTO();

        dto.setId(post.getPostId().toString());

        dto.setAuthor(post.getAuthor().getUsername());
        dto.setAuthorId(post.getAuthor().getUserId());

        dto.setTitle(post.getTitle());
        dto.setText(post.getText());
        dto.setImage(post.getImage());

        dto.setTags(
                post.getTags() == null
                        ? List.of()
                        : post.getTags()
                        .stream()
                        .map(Tag::getName)
                        .toList()
        );

        dto.setCreatedAt(post.getDate().toString());
        dto.setStatus(post.getStatus().name());

        long likes = postLikeRepository.countByPostPostIdAndLiked(post.getPostId(), true);
        long dislikes = postLikeRepository.countByPostPostIdAndLiked(post.getPostId(), false);

        double score = likes - dislikes;

        dto.setLikes(likes);
        dto.setDislikes(dislikes);
        dto.setScore(score);

        return dto;
    }

    public PostResponseDTO votePost(Long postId, Long userId, boolean liked) {

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<PostLike> existing =
                postLikeRepository.findByUserUserIdAndPostPostId(userId, postId);

        if (existing.isPresent()) {
            PostLike vote = existing.get();

            if (vote.getLiked() == liked) {
                postLikeRepository.delete(vote);

                return mapToDTO(post);
            }

            vote.setLiked(liked);
            postLikeRepository.save(vote);

            return mapToDTO(post);
        }

        PostLike newVote = new PostLike();
        newVote.setLiked(liked);
        newVote.setUser(user);
        newVote.setPost(post);

        postLikeRepository.save(newVote);

        return mapToDTO(post);
    }

    public PostResponseDTO closeComments(Long id, Long userId) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getAuthor().getUserId().equals(userId)) {
            throw new RuntimeException("Not allowed");
        }

        post.setStatus(PostStatus.EXPIRED);

        return mapToDTO(postRepository.save(post));
    }
}