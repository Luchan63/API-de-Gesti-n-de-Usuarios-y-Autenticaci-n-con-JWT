package com.luis.backend.usersapp.repository;

import com.luis.backend.usersapp.modals.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select u from User u where u.username = ?1")
    Optional<User> getUserByUsername(String username);
}
