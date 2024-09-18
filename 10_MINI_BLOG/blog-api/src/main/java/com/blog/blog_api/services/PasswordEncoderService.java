package com.blog.blog_api.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class PasswordEncoderService {
    
    @Autowired
    PasswordEncoder encoder;


    public String encoderPassword(String password){
        return this.encoder.encode(password);
    }
}
