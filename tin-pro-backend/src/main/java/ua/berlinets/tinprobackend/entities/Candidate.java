package ua.berlinets.tinprobackend.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private int yearsOfExperience;

    @Column
    private String desiredPosition;

    @Column
    private String desiredSalary;

    @Column
    private String skills;

    @Column
    private String aboutMe;

    @Column
    private String cvName;

    @Lob
    private byte[] cv;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
    private List<JobCandidate> jobCandidates;

}
