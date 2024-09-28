package com.blog.blog_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog_api.dto.input.UserInputDto;
import com.blog.blog_api.dto.output.UserOutputDto;
import com.blog.blog_api.repositories.UserRepository;
import com.blog.blog_api.services.converter.UserConverter;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoderService encoderService;

    public UserOutputDto save(UserInputDto user) {
        user.setPassword(this.encoderService.encoderPassword(user.getPassword()));
        user.setRole("USER");
        var userCreated = this.repository.save(UserConverter.convertInputDtoToModel(user));

        return UserConverter.convertUserToOutput(userCreated);
    }

}
