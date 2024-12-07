package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserCandidateResponseDTO extends UserResponseDTO {
    private String aboutMe;
    private int yearsOfExperience;
    private String desiredPosition;
    private String skills;
    private byte[] cv;
}
