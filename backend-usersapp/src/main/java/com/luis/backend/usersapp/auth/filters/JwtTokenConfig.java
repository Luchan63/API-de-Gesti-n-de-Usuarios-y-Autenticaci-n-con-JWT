package com.luis.backend.usersapp.auth.filters;

import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;

public class JwtTokenConfig {
    public final static String BERER = "Bearer ";
//  public final static String SECRET_KEY = "algun_token_con_alguna_frase_secreta";
    public final static String HEADER_AUTHORIZATION = "Authorization";
    public final static SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
}
