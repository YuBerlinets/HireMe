package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import ua.berlinets.tinprobackend.entities.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findAll(Pageable pageable);
}
