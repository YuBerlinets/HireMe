package ua.berlinets.tinprobackend.controllers;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Meta;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ua.berlinets.tinprobackend.dto.job.JobRequestDTO;
import ua.berlinets.tinprobackend.dto.job.JobResponseDTO;
import ua.berlinets.tinprobackend.dto.job.UpdateJobDTO;
import ua.berlinets.tinprobackend.entities.Candidate;
import ua.berlinets.tinprobackend.entities.Job;
import ua.berlinets.tinprobackend.entities.Recruiter;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.enums.RoleEnum;
import ua.berlinets.tinprobackend.services.CandidateService;
import ua.berlinets.tinprobackend.services.JobService;
import ua.berlinets.tinprobackend.services.UserService;

@RestController
@RequestMapping("/api/jobs")
@AllArgsConstructor
public class JobController {
    private final JobService jobService;
    private final UserService userService;
    private final CandidateService candidateService;

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

        JobResponseDTO response = jobService.getJobResponseById(id);
        if (response == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-recruiter/{recruiterId}")
    public ResponseEntity<?> getJobsByRecruiter(@PathVariable Long recruiterId, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (recruiterId == null)
            return ResponseEntity.badRequest().build();
        try {
            Recruiter recruiter = userService.getUserById(recruiterId).orElseThrow(
                    () -> new RuntimeException("Recruiter not found")
            ).getRecruiter();
            return ResponseEntity.ok(jobService.getJobsByRecruiter(recruiter));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/posted")
    public ResponseEntity<?> getPostedJobs(Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (user.getRole() != RoleEnum.RECRUITER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        return ResponseEntity.ok(jobService.getPostedJobs(user.getRecruiter()));
    }


    @PostMapping("/{jobId}/assign-candidate/{candidateId}")
    public ResponseEntity<?> assignCandidate(@PathVariable Long jobId, @PathVariable Long candidateId, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (user.getRole() != RoleEnum.RECRUITER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        if (jobId == null || candidateId == null)
            return ResponseEntity.badRequest().build();
        Candidate candidate = candidateService.getCandidateById(candidateId);
        Job job = jobService.getJobById(jobId);
        if (job == null || candidate == null)
            return ResponseEntity.notFound().build();
        if (job.getRecruiter().getId() != user.getRecruiter().getId())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        jobService.assignCandidate(job, candidate, user.getRecruiter());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{jobId}")
    public ResponseEntity<?> updateJob(@PathVariable Long jobId, @RequestBody UpdateJobDTO updateJobDTO, Authentication authentication) {
        User user = checkAuthentication(authentication);
        if (user == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (user.getRole() != RoleEnum.RECRUITER)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        Job job = jobService.getJobById(jobId);
        if (job == null)
            return ResponseEntity.notFound().build();
        if (job.getRecruiter().getId() != user.getRecruiter().getId())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        jobService.updateJob(job, updateJobDTO);
        return ResponseEntity.ok().build();
    }

}
