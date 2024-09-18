package com.blog.blog_api.dto.input;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserInputDto {
    private Long id;
    private String email;
    private String username;
    private String password;
    private String role;
}
