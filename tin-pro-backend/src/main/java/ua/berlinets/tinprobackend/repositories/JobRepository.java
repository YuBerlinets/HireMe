package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.berlinets.tinprobackend.entities.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
}
