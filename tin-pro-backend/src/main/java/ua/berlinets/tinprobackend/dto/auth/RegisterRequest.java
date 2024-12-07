package ua.berlinets.tinprobackend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.berlinets.tinprobackend.enums.RoleEnum;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String email;
    private String name;
    private String password;
    private RoleEnum type;
}
