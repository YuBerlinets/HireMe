package ua.berlinets.tinprobackend.dto.candidate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListCandidateResponseDTO {
    private String firstName;
    private String lastName;
    private int yearsOfExperience;
    private String desiredPosition;
    private String desiredSalary;
}
