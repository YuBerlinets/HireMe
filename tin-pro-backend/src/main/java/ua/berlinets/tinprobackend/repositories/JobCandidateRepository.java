package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.berlinets.tinprobackend.entities.JobCandidate;

public interface JobCandidateRepository extends JpaRepository<JobCandidate, Long> {
}
