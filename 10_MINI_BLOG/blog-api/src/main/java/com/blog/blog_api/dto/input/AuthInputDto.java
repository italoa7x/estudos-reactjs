package com.blog.blog_api.dto.input;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthInputDto {

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

}
