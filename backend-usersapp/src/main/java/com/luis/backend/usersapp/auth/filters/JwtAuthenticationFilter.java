package com.luis.backend.usersapp.auth.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luis.backend.usersapp.modals.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        User user = null;
        String username = null;
        String password = null;

        try {
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            username = user.getUsername();
            password = user.getPassword();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal()).getUsername();

        Collection<? extends GrantedAuthority> authorities = authResult.getAuthorities();
        boolean isAdmin = authorities.stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", new ObjectMapper().writeValueAsString(authorities));
        claims.put("isAdmin", isAdmin);
        claims.put("username", username);


        String token =  Jwts.builder()
                .issuer("me") // Emisor del token: indica quién genera el token, en este caso, "me".
                .subject(username) // Sujeto del token: el nombre de usuario del usuario autenticado.
                .claims(claims)
                .audience().add("you") // Audiencia: para quién es válido el token, aquí se añade "you" como destinatario.
                .and() // Finaliza el bloque de audiencia y continúa con la construcción del token.
                .issuedAt(new Date()) // Fecha de emisión: indica cuándo fue emitido el token, en este caso, la fecha actual.
                .expiration(new Date(System.currentTimeMillis() + 3600000)) // Fecha de expiración: el token caduca en 1 hora.
                .signWith(JwtTokenConfig.SECRET_KEY) // Firma: el token se firma con la clave secreta para garantizar su autenticidad.
                .compact(); // Compacta el token en una cadena de texto en formato JWT.

        response.addHeader(JwtTokenConfig.HEADER_AUTHORIZATION, JwtTokenConfig.BERER + token);

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("massage", String.format("hola %s, has iniciado sesion con exito!", username));
        body.put("username", username);
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(200);
        response.setContentType("application/json");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {

        Map<String, Object> body = new HashMap<>();
        body.put("massage", "Error en la autenticacion username o password incorrecto!");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(401);
        response.setContentType("application/json");
    }
}
