package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;

@Data
public class UpdateUserDTO {
    private String firstName;
    private String lastName;
    private String email;
}
