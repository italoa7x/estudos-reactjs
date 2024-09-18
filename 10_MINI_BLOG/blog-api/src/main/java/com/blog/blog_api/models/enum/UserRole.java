package com.blog.blog_api.models.enum;

public enum UserRole {
    USER("USER");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
}
