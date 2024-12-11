package ua.berlinets.tinprobackend.services;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.dto.job.JobListResponseDTO;
import ua.berlinets.tinprobackend.dto.user.*;
import ua.berlinets.tinprobackend.entities.Recruiter;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.enums.RoleEnum;
import ua.berlinets.tinprobackend.repositories.AdminRepository;
import ua.berlinets.tinprobackend.repositories.JobRepository;
import ua.berlinets.tinprobackend.repositories.RecruiterRepository;
import ua.berlinets.tinprobackend.repositories.UserRepository;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final RecruiterRepository recruiterRepository;
    private final ModelMapper modelMapper;
    private final JobRepository jobRepository;

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
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
            recruiter.setJobs(getJobsByRecruiter(user.getRecruiter()));
            response = recruiter;
        }

        return response;
    }

    private List<JobListResponseDTO> getJobsByRecruiter(Recruiter recruiter) {
        return jobRepository.findAllByRecruiter(recruiter).stream()
                .map(job -> {
                    JobListResponseDTO jobListResponseDTO = modelMapper.map(job, JobListResponseDTO.class);
                    jobListResponseDTO.setCompany(job.getRecruiter().getCompany());
                    jobListResponseDTO.setDate(getFormattedDate(job.getDatePosted()));
                    return jobListResponseDTO;
                })
                .toList();
    }

    private String getFormattedDate(Instant date) {
        ZonedDateTime zonedDateTime = date.atZone(ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd.MM.yyyy");
        return zonedDateTime.format(formatter);
    }
}
