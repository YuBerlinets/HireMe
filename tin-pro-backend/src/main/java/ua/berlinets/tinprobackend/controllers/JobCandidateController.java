package ua.berlinets.tinprobackend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ua.berlinets.tinprobackend.dto.jobCandidate.JobCandidateUpdateDTO;
import ua.berlinets.tinprobackend.entities.Candidate;
import ua.berlinets.tinprobackend.entities.Job;
import ua.berlinets.tinprobackend.entities.JobCandidate;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.enums.RoleEnum;
import ua.berlinets.tinprobackend.services.JobCandidateService;
import ua.berlinets.tinprobackend.services.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/job-candidates")
public class JobCandidateController {
    private JobCandidateService jobCandidateService;
    private UserService userService;

    private User checkAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
        }
        return null;
    }

    @DeleteMapping("/{jobCandidateId}")
    public ResponseEntity<?> unassignCandidate(@PathVariable Long jobCandidateId, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (user.getRole() != RoleEnum.RECRUITER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        JobCandidate jobCandidate = jobCandidateService.getJobCandidateById(jobCandidateId);
        if (jobCandidate == null)
            return ResponseEntity.notFound().build();
        if (jobCandidate.getRecruiter().getId() != user.getRecruiter().getId())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        jobCandidateService.unassignCandidate(jobCandidateId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{jobCandidateId}")
    public ResponseEntity<?> updateJobCandidate(@PathVariable Long jobCandidateId, @RequestBody JobCandidateUpdateDTO jobCandidateUpdateDTO, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (user.getRole() != RoleEnum.RECRUITER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        JobCandidate jobCandidateFromDb = jobCandidateService.getJobCandidateById(jobCandidateId);
        if (jobCandidateFromDb == null)
            return ResponseEntity.notFound().build();
        if (jobCandidateFromDb.getRecruiter().getId() != user.getRecruiter().getId())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        jobCandidateService.updateJobCandidate(jobCandidateFromDb, jobCandidateUpdateDTO);
        return ResponseEntity.ok().build();
    }
}
