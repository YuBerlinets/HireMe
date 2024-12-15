package ua.berlinets.tinprobackend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String title;

    @Column(length = 2500)
    private String description;

    @Column
    private String location;

    @Column
    private String status;

    @Column
    private Instant datePosted;

    @ManyToOne
    @JoinColumn(name = "recruiter_id", nullable = false)
    private Recruiter recruiter;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private List<JobCandidate> jobCandidates;
}