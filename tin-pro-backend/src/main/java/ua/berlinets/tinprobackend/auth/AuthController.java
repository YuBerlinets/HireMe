package ua.berlinets.tinprobackend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.berlinets.tinprobackend.dto.auth.AuthenticationRequest;
import ua.berlinets.tinprobackend.dto.auth.AuthenticationResponse;
import ua.berlinets.tinprobackend.dto.auth.RegisterRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(AuthenticationRequest authenticationRequest) {
        AuthenticationResponse authenticationResponse;
        try {
            authenticationResponse = authService.login(authenticationRequest);
        } catch (IllegalArgumentException e) {
            authenticationResponse = new AuthenticationResponse();
            authenticationResponse.setMessage("Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authenticationResponse);
        }
        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("/candidate/register")
    public ResponseEntity<?> registerCandidate(@RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(authService.registerCandidate(registerRequest));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/recruiter/register")
    public ResponseEntity<?> registerRecruiter(@RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(authService.registerRecruiter(registerRequest));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
