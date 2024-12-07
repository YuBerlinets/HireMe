package ua.berlinets.tinprobackend.dto.candidate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LimitedCandidateResponseDTO {
    private String firstName;
    private String lastName;
    private String aboutMe;
    private int yearsOfExperience;
    private String desiredPosition;
    private String skills;
}
