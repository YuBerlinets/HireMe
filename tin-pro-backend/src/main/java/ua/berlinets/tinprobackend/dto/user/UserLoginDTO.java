package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import ua.berlinets.tinprobackend.enums.RoleEnum;

@Data
@NoArgsConstructor
public class UserLoginDTO {
    private String email;
    private String firstName;
    private String lastName;
    private RoleEnum role;
}
