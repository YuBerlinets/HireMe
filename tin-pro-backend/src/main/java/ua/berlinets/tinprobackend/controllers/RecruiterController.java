package ua.berlinets.tinprobackend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.services.RecruiterService;
import ua.berlinets.tinprobackend.services.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/recruiters")
public class RecruiterController {
    private RecruiterService recruiterService;
    private UserService userService;

    private User checkAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
        }
        return null;
    }

    @GetMapping("/assigned-jobs")
    public ResponseEntity<?> getAssignedJobs(Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (user.getRecruiter() == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(recruiterService.getAllAssignedCandidatesJob(user.getRecruiter()));
    }
}
