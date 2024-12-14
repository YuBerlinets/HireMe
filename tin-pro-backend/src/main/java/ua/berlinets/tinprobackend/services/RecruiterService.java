package ua.berlinets.tinprobackend.services;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.dto.recruiter.RecruiterAssignedJobs;
import ua.berlinets.tinprobackend.entities.JobCandidate;
import ua.berlinets.tinprobackend.entities.Recruiter;
import ua.berlinets.tinprobackend.repositories.JobCandidateRepository;
import ua.berlinets.tinprobackend.repositories.JobRepository;
import ua.berlinets.tinprobackend.repositories.RecruiterRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class RecruiterService {
    private final RecruiterRepository recruiterRepository;
    private final JobCandidateRepository jobCandidateRepository;
    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;

    public Recruiter getRecruiterById(Long id) {
        return recruiterRepository.findById(id).orElse(null);
    }

    public List<RecruiterAssignedJobs> getAllAssignedCandidatesJob(Recruiter recruiter) {
        List<JobCandidate> jobCandidates = jobCandidateRepository.findAllByRecruiter(recruiter);
        return jobCandidates.stream().map(jobCandidate -> {
            RecruiterAssignedJobs recruiterAssignedJobs = new RecruiterAssignedJobs();
            recruiterAssignedJobs.setJobCandidateId(jobCandidate.getId());
            recruiterAssignedJobs.setCandidateId(jobCandidate.getCandidate().getId());
            recruiterAssignedJobs.setCandidateName(jobCandidate.getCandidate().getUser().getFirstName() + " " + jobCandidate.getCandidate().getUser().getLastName());
            recruiterAssignedJobs.setJobId(jobCandidate.getJob().getId());
            recruiterAssignedJobs.setJobTitle(
                    jobCandidate.getJob().getTitle() +
                            " | " + jobCandidate.getJob().getRecruiter().getCompany() +
                            " | " + jobCandidate.getJob().getLocation()
            );
            recruiterAssignedJobs.setStatus(jobCandidate.getStatus());
            return recruiterAssignedJobs;
        }).toList();
    }

}
