package org.example.proiectps.repository;

import org.example.proiectps.entity.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByPostPostId(Long postId);
    //metodele default in crud repo sunt save(), findById(), findAll(), deleteById()
}
