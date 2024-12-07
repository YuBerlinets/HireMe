package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;
import ua.berlinets.tinprobackend.enums.RoleEnum;

@Data
public class UserResponseDTO implements IUserResponseDTO {
    private String firstName;
    private String lastName;
    private String email;
    private RoleEnum role;
}
