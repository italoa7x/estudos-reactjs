package com.blog.blog_api.services.converter;

import java.util.List;
import java.util.stream.Collectors;

import com.blog.blog_api.dto.input.UserInputDto;
import com.blog.blog_api.dto.output.UserOutputDto;
import com.blog.blog_api.models.User;

public abstract class UserConverter {

    public static User convertInputDtoToModel(UserInputDto user) {
        return new User(null, user.getEmail(), user.getUsername(), user.getPassword(), user.getRole());
    }

    public static UserOutputDto convertInputToOutput(UserInputDto userInput) {
        return new UserOutputDto(userInput.getId(), userInput.getUsername(), userInput.getEmail());
    }

    public static UserOutputDto convertUserToOutput(User user) {
        return new UserOutputDto(user.getId(), user.getUsername(), user.getEmail());
    }

    public static List<UserOutputDto> convertListModelToDto(List<User> users) {
        return users.stream().map(
                user -> {
                    return new UserOutputDto(user.getId(), user.getUsername(), user.getEmail());
                }).collect(Collectors.toList());
    }
}
