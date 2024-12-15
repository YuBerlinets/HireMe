package ua.berlinets.tinprobackend.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.dto.jobCandidate.JobCandidateUpdateDTO;
import ua.berlinets.tinprobackend.entities.JobCandidate;
import ua.berlinets.tinprobackend.repositories.JobCandidateRepository;

@Service
@AllArgsConstructor
public class JobCandidateService {
    private final JobCandidateRepository jobCandidateRepository;

    public JobCandidate getJobCandidateById(Long id) {
        return jobCandidateRepository.findById(id).orElse(null);
    }

    public void unassignCandidate(Long jobCandidateId) {
        jobCandidateRepository.deleteById(jobCandidateId);
    }

    public void updateJobCandidate(JobCandidate jobCandidate, JobCandidateUpdateDTO jobCandidateUpdateDTO) {
        if (jobCandidate == null)
            return;
        jobCandidate.setStatus(jobCandidateUpdateDTO.getStatus());
        jobCandidateRepository.save(jobCandidate);
    }
}
