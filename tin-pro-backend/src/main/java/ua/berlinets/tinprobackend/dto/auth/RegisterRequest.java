package ua.berlinets.tinprobackend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import ua.berlinets.tinprobackend.enums.RoleEnum;

@Data
@Builder
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String name;
    private String password;
    private RoleEnum type;
}
