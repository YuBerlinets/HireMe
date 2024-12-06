package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.berlinets.tinprobackend.entities.Recruiter;

public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
}
