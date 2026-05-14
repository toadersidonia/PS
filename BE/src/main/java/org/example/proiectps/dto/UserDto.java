package org.example.proiectps.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.proiectps.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long userId;
    private String username;
    private String email;
    private String role;
    private Long score;
    private boolean banned;

    public static UserDto fromEntity(User user) {
        return new UserDto(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getScore(),
                user.isBanned()
        );
    }
}