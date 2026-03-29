package org.example.proiectps.service;

import org.example.proiectps.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
