package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.berlinets.tinprobackend.entities.JobCandidate;
import ua.berlinets.tinprobackend.entities.Recruiter;

import java.util.List;

public interface JobCandidateRepository extends JpaRepository<JobCandidate, Long> {
    List<JobCandidate> findAllByRecruiter(Recruiter recruiter);
}
