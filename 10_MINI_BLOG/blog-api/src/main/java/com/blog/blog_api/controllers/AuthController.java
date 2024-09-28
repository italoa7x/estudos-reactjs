package com.blog.blog_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog_api.dto.input.AuthInputDto;
import com.blog.blog_api.dto.input.UserInputDto;
import com.blog.blog_api.dto.output.AuthTokenDto;
import com.blog.blog_api.dto.output.UserOutputDto;
import com.blog.blog_api.models.User;
import com.blog.blog_api.services.TokenService;
import com.blog.blog_api.services.UserService;

@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthTokenDto> login(@RequestBody @Validated AuthInputDto authInputDto) {
        UsernamePasswordAuthenticationToken userAndPassword = new UsernamePasswordAuthenticationToken(
                authInputDto.getUsername(),
                authInputDto.getPassword());

        try {
            Authentication auth = this.authenticationManager.authenticate(userAndPassword);
            var token = this.tokenService.generateToken((User) auth.getPrincipal());

            return ResponseEntity.ok(new AuthTokenDto(token));
        } catch (Exception e) {
            throw new RuntimeException("Erro on authentication" + e);
        }

    }

    @PostMapping("/register")
    public ResponseEntity<UserOutputDto> register(@RequestBody @Validated UserInputDto userInputDto) {
        return ResponseEntity.created(null).body(this.userService.save(userInputDto));
    }
}
