package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserCandidateResponseDTO extends UserResponseDTO {
    private String aboutMe;
    private int yearsOfExperience;
    private String desiredPosition;
    private String desiredSalary;
    private String skills;
    private String cvName;
    private byte[] cv;
}
