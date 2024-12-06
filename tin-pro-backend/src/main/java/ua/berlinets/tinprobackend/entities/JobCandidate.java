package ua.berlinets.tinprobackend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class JobCandidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @Column(nullable = false)
    private String status;

}
