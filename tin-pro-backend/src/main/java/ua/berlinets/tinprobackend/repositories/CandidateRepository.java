package ua.berlinets.tinprobackend.repositories;

import ua.berlinets.tinprobackend.entities.Candidate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Page<Candidate> findAll(Pageable pageable);
}
