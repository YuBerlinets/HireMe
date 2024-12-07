package ua.berlinets.tinprobackend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.berlinets.tinprobackend.dto.auth.AuthenticationRequest;
import ua.berlinets.tinprobackend.dto.auth.RegisterRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateRecruiter(AuthenticationRequest authenticationRequest) {
        return ResponseEntity.ok(authService.login(authenticationRequest));
    }

    @PostMapping("/candidate/register")
    public ResponseEntity<?> registerCandidate(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.registerCandidate(registerRequest));
    }

    @PostMapping("/recruiter/register")
    public ResponseEntity<?> registerRecruiter(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.registerRecruiter(registerRequest));
    }
}
