package com.luis.backend.usersapp.modals.dto.mapper;

import com.luis.backend.usersapp.modals.dto.UserDTO;
import com.luis.backend.usersapp.modals.entity.User;
import jdk.jshell.spi.ExecutionControl;

public class DtoMapperUser {


    private User user;

    private DtoMapperUser() {
    }

    public static DtoMapperUser builder() {
        return new DtoMapperUser();
    }

    public DtoMapperUser setUser(User user) {
        this.user = user;
        return this;
    }

    public UserDTO Build() {
        if (user == null) {
            throw new RuntimeException("Debe pasar el entidad de usuario");
        }

        boolean isAdmin = user.getRoles().stream().anyMatch(r -> "ROLE_ADMIN".equals(r.getName()));
        return new UserDTO(this.user.getId(), this.user.getUsername(), this.user.getEmail(), isAdmin);
    }
}
