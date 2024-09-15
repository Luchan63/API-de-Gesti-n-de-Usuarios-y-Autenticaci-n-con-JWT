package com.luis.backend.usersapp.service;

import com.luis.backend.usersapp.modals.IUser;
import com.luis.backend.usersapp.modals.dto.UserDTO;
import com.luis.backend.usersapp.modals.dto.mapper.DtoMapperUser;
import com.luis.backend.usersapp.modals.entity.Role;
import com.luis.backend.usersapp.modals.entity.User;
import com.luis.backend.usersapp.repository.RoleRepository;
import com.luis.backend.usersapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        List<User> users = (List<User>) userRepository.findAll();

        return users.stream().map(
                user -> DtoMapperUser.builder().setUser(user).Build()
        ).collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDTO> findById(long id)
    {
       return userRepository.findById(id)
               .map(user -> DtoMapperUser
                    .builder()
                    .setUser(user)
                    .Build()
               );
    }

    @Override
    @Transactional
    public UserDTO save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRoles(getRoles(user));
        return DtoMapperUser.builder().setUser(userRepository.save(user)).Build();
    }


    @Override
    @Transactional
    public Optional<UserDTO> update(UserDTO user, long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userDb = userOptional.get();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            userDb.setRoles(getRoles(user));

            return Optional.ofNullable(DtoMapperUser.builder().setUser(userRepository.save(userDb)).Build());
        }
        return Optional.empty();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public void delete(long id) {
        userRepository.deleteById(id);
    }
    private List<Role> getRoles(IUser user) {
        Optional<Role> roleUsuario = roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();
        if (roleUsuario.isPresent()) {
            roles.add(roleUsuario.orElseThrow());
        }
        if (user.isAdmin()) {
            Optional<Role> adminRole = roleRepository.findByName("ROLE_ADMIN");
            if (adminRole.isPresent()) {
                roles.add(adminRole.orElseThrow());
            }
        }
        return roles;
    }
}
