package ua.berlinets.tinprobackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.berlinets.tinprobackend.dto.candidate.CandidatesPaginationDTO;
import ua.berlinets.tinprobackend.dto.candidate.ICandidateResponseDTO;
import ua.berlinets.tinprobackend.dto.candidate.UpdateCandidateDTO;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.services.CandidateService;
import ua.berlinets.tinprobackend.services.UserService;

import java.io.IOException;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {
    private final UserService userService;
    private final CandidateService candidateService;

    private User checkAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
        }
        return null;
    }

    @PatchMapping
    public ResponseEntity<?> updateCandidate(@RequestBody UpdateCandidateDTO updateCandidateDTO, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        candidateService.updateCandidate(user, updateCandidateDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/cv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadCv(@RequestParam("file") MultipartFile file, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            candidateService.uploadCv(user, file);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload file");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/p")
    public ResponseEntity<?> getAllCandidates(@PageableDefault(size = 10) Pageable pageable) {
        CandidatesPaginationDTO paginationDTO = candidateService.getCandidates(pageable);
        return ResponseEntity.ok(paginationDTO);
    }

    @GetMapping("/p/{id}")
    public ResponseEntity<?> getCandidate(@PathVariable String id, Authentication authentication) {
        User user = checkAuthentication(authentication);
        boolean isRecruiter = user != null && user.getRecruiter() != null;

        ICandidateResponseDTO candidateResponseDTO = candidateService.getCandidateResponseById(Long.parseLong(id), isRecruiter);

        return ResponseEntity.ok(candidateResponseDTO);
    }

    @DeleteMapping("/cv")
    public ResponseEntity<?> deleteCv(Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        candidateService.deleteCv(user);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/{email}")
//    public ResponseEntity<?> getCandidateResponseById(@PathVariable String email, Authentication authentication) {
//        User user = checkAuthentication(authentication);
//        if (user == null) {
//            return ResponseEntity.ok(candidateService.getCandidateInformationByEmail(email, true));
//        }
//        return ResponseEntity.ok(candidateService.getCandidateInformationByEmail(email, false));
//    }

}
