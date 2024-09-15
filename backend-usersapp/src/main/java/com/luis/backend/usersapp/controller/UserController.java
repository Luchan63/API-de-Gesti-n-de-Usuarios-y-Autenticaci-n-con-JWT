package com.luis.backend.usersapp.controller;

import com.luis.backend.usersapp.modals.dto.UserDTO;
import com.luis.backend.usersapp.modals.entity.User;
import com.luis.backend.usersapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users-app")
@CrossOrigin(originPatterns = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/users")
    public List<UserDTO> getUsers() {

        return userService.findAll();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<UserDTO> userId = userService.findById(id); // validamos si existe ell id
        if (userId.isPresent()) {

            return ResponseEntity.ok(userId.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/create")
    public ResponseEntity<?> create (@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UserDTO user, BindingResult result, @PathVariable Long id) {

        if (result.hasErrors()) {
            return validation(result);
        }

        Optional<UserDTO> userOptional = userService.update(user,id);
        if (userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(userOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }


    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<UserDTO> user = userService.findById(id);
        if (user.isPresent()) {
            userService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    private ResponseEntity<?> validation(BindingResult result) {
        // creamos un map con la llave y valor para poder registrar las validaciones
        Map<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            // endicamos mediante un put que el campo no puede ser vacio
            errors.put(err.getField(), "El campo "+ err.getField() + " " + err.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body(errors);
    }
}