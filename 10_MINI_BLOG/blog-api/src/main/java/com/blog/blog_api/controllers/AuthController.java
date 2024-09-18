package com.blog.blog_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog_api.dto.input.AuthInputDto;
import com.blog.blog_api.dto.input.UserInputDto;
import com.blog.blog_api.dto.output.UserOutputDto;
import com.blog.blog_api.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Authentication> login(@RequestBody @Validated AuthInputDto authInputDto) {
        UsernamePasswordAuthenticationToken userAndPassword = new UsernamePasswordAuthenticationToken(
                authInputDto.getUsername(),
                authInputDto.getPassword());
    
        Authentication auth = this.authenticationManager.authenticate(userAndPassword);

        return ResponseEntity.ok().body(auth);
    }

    @PostMapping("/register")
    public ResponseEntity<UserOutputDto> register(@RequestBody @Validated UserInputDto userInputDto) {
        return ResponseEntity.created(null).body(this.userService.save(userInputDto));
    }
}
