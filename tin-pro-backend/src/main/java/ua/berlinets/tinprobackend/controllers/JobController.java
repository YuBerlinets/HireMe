package ua.berlinets.tinprobackend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ua.berlinets.tinprobackend.dto.job.JobRequestDTO;
import ua.berlinets.tinprobackend.dto.job.JobResponseDTO;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.enums.RoleEnum;
import ua.berlinets.tinprobackend.services.JobService;
import ua.berlinets.tinprobackend.services.UserService;

@RestController
@RequestMapping("/api/jobs")
@AllArgsConstructor
public class JobController {
    private final JobService jobService;
    private final UserService userService;

    private User checkAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<?> postJob(@RequestBody JobRequestDTO jobRequestDTO, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (user.getRole() != RoleEnum.RECRUITER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        jobService.postJob(user, jobRequestDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> getJobs(@PageableDefault(size = 10) Pageable pageable, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(jobService.getJobs(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (id == null)
            return ResponseEntity.badRequest().build();

        JobResponseDTO response = jobService.getJobById(id);
        if (response == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(response);

    }
}
