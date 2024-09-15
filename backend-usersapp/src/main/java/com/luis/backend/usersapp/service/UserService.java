package com.luis.backend.usersapp.service;

import com.luis.backend.usersapp.modals.dto.UserDTO;
import com.luis.backend.usersapp.modals.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserDTO> findAll();

    Optional<UserDTO> findById(long id);

    UserDTO save(User user);

    Optional<UserDTO> update (UserDTO user, long id);

    Optional<User> findByUsername(String username);

    void delete(long id);
}
