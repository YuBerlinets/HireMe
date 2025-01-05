package ua.berlinets.tinprobackend.controllers;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.services.JobService;
import ua.berlinets.tinprobackend.services.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    private User checkAuthentication(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
        }
        return null;
    }

    @GetMapping("/my-information")
    public ResponseEntity<?> getBasicInformation(Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(401).build();

        return ResponseEntity.ok(userService.getUserInformation(user));
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(401).build();

        userService.deleteUser(user);
        return ResponseEntity.ok().build();
    }
}
