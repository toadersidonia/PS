package org.example.proiectps.repository;

import org.example.proiectps.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
