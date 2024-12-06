package ua.berlinets.tinprobackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.berlinets.tinprobackend.enums.RoleEnum;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private RoleEnum role;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Candidate candidate;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Recruiter recruiter;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Admin admin;

}