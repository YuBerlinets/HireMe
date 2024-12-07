package ua.berlinets.tinprobackend.dto.candidate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LimitedCandidateResponseDTO {
    private String firstName;
    private String lastName;
    private String aboutMe;
    private int yearsOfExperience;
    private String desiredPosition;
    private String skills;
}
