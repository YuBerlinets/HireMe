package ua.berlinets.tinprobackend.auth;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.configs.CustomUserDetailsService;
import ua.berlinets.tinprobackend.configs.JwtService;
import ua.berlinets.tinprobackend.dto.auth.AuthenticationRequest;
import ua.berlinets.tinprobackend.dto.auth.AuthenticationResponse;
import ua.berlinets.tinprobackend.dto.auth.RegisterRequest;
import ua.berlinets.tinprobackend.dto.user.UserLoginDTO;
import ua.berlinets.tinprobackend.entities.Candidate;
import ua.berlinets.tinprobackend.entities.Recruiter;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.enums.RoleEnum;
import ua.berlinets.tinprobackend.repositories.CandidateRepository;
import ua.berlinets.tinprobackend.repositories.RecruiterRepository;
import ua.berlinets.tinprobackend.repositories.UserRepository;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final RecruiterRepository recruiterRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final ModelMapper modelMapper;

    public AuthenticationResponse login(AuthenticationRequest request) {

        User user = userRepository.findByEmail(request.getLogin())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        String jwtToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken();

        UserLoginDTO userLoginDTO = modelMapper.map(user, UserLoginDTO.class);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .user(userLoginDTO)
                .message("Login successful.")
                .build();
    }

    public AuthenticationResponse registerCandidate(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        if (!validateEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email.");
        }
        if (!validatePassword(request.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(RoleEnum.CANDIDATE);
        userRepository.save(user);

        Candidate candidate = new Candidate();
        candidate.setUser(user);
        candidateRepository.save(candidate);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        String jwtToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken();

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .message("Candidate has been successfully registered")
                .build();
    }

    public AuthenticationResponse registerRecruiter(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        if (!validateEmail(request.getEmail())) {
            throw new IllegalArgumentException("Invalid email.");
        }
        if (!validatePassword(request.getPassword())) {
            throw new IllegalArgumentException("Invalid password.");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(RoleEnum.RECRUITER);
        userRepository.save(user);

        Recruiter recruiter = new Recruiter();
        recruiter.setUser(user);
        recruiterRepository.save(recruiter);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        String jwtToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken();

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .message("Recruiter has been successfully registered")
                .build();
    }

    private boolean validateEmail(String email) {
        return email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
    }

    public boolean validatePassword(String password) {
        return password.length() >= 8 &&
                password.matches(".*[A-Z].*") &&
                password.matches(".*[a-z].*") &&
                password.matches(".*\\d.*") &&
                password.matches(".*[!@#$%^&*(),.?\":{}|<>].*");
    }
}
