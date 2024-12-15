package ua.berlinets.tinprobackend.services;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.berlinets.tinprobackend.dto.candidate.*;
import ua.berlinets.tinprobackend.entities.Candidate;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.repositories.CandidateRepository;
import ua.berlinets.tinprobackend.repositories.UserRepository;

import java.io.IOException;
import java.util.List;


@Service
@AllArgsConstructor
public class CandidateService {
    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public void updateCandidate(User user, UpdateCandidateDTO updateCandidateDTO) {
        if (updateCandidateDTO.getFirstName() != null) {
            user.setFirstName(updateCandidateDTO.getFirstName());
        }
        if (updateCandidateDTO.getLastName() != null) {
            user.setLastName(updateCandidateDTO.getLastName());
        }
        if (updateCandidateDTO.getEmail() != null) {
            user.setEmail(updateCandidateDTO.getEmail());
        }
        Candidate candidate = user.getCandidate();
        if (updateCandidateDTO.getAboutMe() != null) {
            candidate.setAboutMe(updateCandidateDTO.getAboutMe());
        }
        if (updateCandidateDTO.getYearsOfExperience() >= 0) {
            candidate.setYearsOfExperience(updateCandidateDTO.getYearsOfExperience());
        }
        if (updateCandidateDTO.getSkills() != null) {
            candidate.setSkills(updateCandidateDTO.getSkills());
        }
        if (updateCandidateDTO.getDesiredSalary() != null) {
            candidate.setDesiredSalary(updateCandidateDTO.getDesiredSalary());
        }

        if (updateCandidateDTO.getDesiredPosition() != null) {
            candidate.setDesiredPosition(updateCandidateDTO.getDesiredPosition());
        }

        userRepository.save(user);
        candidateRepository.save(user.getCandidate());

    }

    public void uploadCv(User user, MultipartFile file) throws IOException {
        Candidate candidate = user.getCandidate();
        candidate.setCvName(file.getOriginalFilename());
        candidate.setCv(file.getBytes());
        candidateRepository.save(candidate);
    }

    public CandidatesPaginationDTO getCandidates(Pageable pageable) {
        Page<Candidate> candidatesPage = candidateRepository.findAll(pageable);

        List<ListCandidateResponseDTO> candidates = candidatesPage.stream()
                .map(candidate -> new ListCandidateResponseDTO(
                        candidate.getId(),
                        candidate.getUser().getFirstName(),
                        candidate.getUser().getLastName(),
                        candidate.getYearsOfExperience(),
                        candidate.getDesiredPosition(),
                        candidate.getDesiredSalary()
                ))
                .toList();

        return new CandidatesPaginationDTO(
                candidates,
                candidatesPage.getNumber(),
                candidatesPage.getTotalPages(),
                candidatesPage.getTotalElements()
        );
    }


    public ICandidateResponseDTO getCandidateInformationByEmail(String email, boolean limited) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Candidate candidate = user.getCandidate();
        return extractCandidateInformation(!limited, candidate, user);
    }

    public void deleteCv(User user) {
        Candidate candidate = user.getCandidate();
        candidate.setCv(null);
        candidateRepository.save(candidate);
    }

    public Candidate getCandidateById(long candidateId) {
        return candidateRepository.findById(candidateId).orElse(null);
    }

    public ICandidateResponseDTO getCandidateResponseById(long candidateId, boolean isRecruiter) {
        Candidate candidate = candidateRepository.findById(candidateId).orElse(null);
        if (candidate == null) {
            return null;
        }
        User user = candidate.getUser();
        return extractCandidateInformation(isRecruiter, candidate, user);
    }

    private ICandidateResponseDTO extractCandidateInformation(boolean isRecruiter, Candidate candidate, User user) {
        if (isRecruiter) {
            CandidateResponseDTO candidateResponseDTO = modelMapper.map(candidate, CandidateResponseDTO.class);
            candidateResponseDTO.setFirstName(user.getFirstName());
            candidateResponseDTO.setLastName(user.getLastName());
            candidateResponseDTO.setEmail(user.getEmail());

            return candidateResponseDTO;
        } else {
            LimitedCandidateResponseDTO limitedCandidateResponseDTO = modelMapper.map(candidate, LimitedCandidateResponseDTO.class);
            limitedCandidateResponseDTO.setFirstName(user.getFirstName());
            limitedCandidateResponseDTO.setLastName(user.getLastName());
            return limitedCandidateResponseDTO;
        }
    }
}
