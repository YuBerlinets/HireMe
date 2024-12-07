package ua.berlinets.tinprobackend.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.dto.user.*;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.enums.RoleEnum;
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
    private final ModelMapper modelMapper;


    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public IUserResponseDTO getUserInformation(User user) {
        if (user == null) {
            return null;
        }
        IUserResponseDTO response = null;
        if (user.getCandidate() != null) {
            UserCandidateResponseDTO candidate = modelMapper.map(user.getCandidate(), UserCandidateResponseDTO.class);
            candidate.setFirstName(user.getFirstName());
            candidate.setLastName(user.getLastName());
            candidate.setEmail(user.getEmail());
            candidate.setRole(RoleEnum.CANDIDATE);
            response = candidate;
        }
        if (user.getRecruiter() != null) {
            UserRecruiterResponseDTO recruiter = modelMapper.map(user.getRecruiter(), UserRecruiterResponseDTO.class);
            recruiter.setFirstName(user.getFirstName());
            recruiter.setLastName(user.getLastName());
            recruiter.setEmail(user.getEmail());
            recruiter.setRole(RoleEnum.RECRUITER);
            response = recruiter;
        }

        return response;
    }

}
