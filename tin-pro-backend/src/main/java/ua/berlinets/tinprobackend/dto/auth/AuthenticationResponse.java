package ua.berlinets.tinprobackend.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.berlinets.tinprobackend.dto.user.UserLoginDTO;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String refreshToken;
    private String message;
    private UserLoginDTO user;
}
