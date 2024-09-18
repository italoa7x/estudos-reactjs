package com.blog.blog_api.dto.output;

import lombok.Getter;

@Getter
public class AuthTokenDto {

    private String token;

    public AuthTokenDto(String token) {
        this.token = token;
    }
}
