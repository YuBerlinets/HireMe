package ua.berlinets.tinprobackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.repositories.AdminRepository;
import ua.berlinets.tinprobackend.repositories.RecruiterRepository;
import ua.berlinets.tinprobackend.repositories.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final RecruiterRepository recruiterRepository;


    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
