package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.berlinets.tinprobackend.entities.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}
