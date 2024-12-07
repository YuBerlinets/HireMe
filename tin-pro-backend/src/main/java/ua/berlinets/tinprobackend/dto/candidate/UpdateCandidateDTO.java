package ua.berlinets.tinprobackend.dto.candidate;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;
import ua.berlinets.tinprobackend.dto.user.UpdateUserDTO;

@Data
@EqualsAndHashCode(callSuper = true)
public class UpdateCandidateDTO extends UpdateUserDTO {
    private String skills;
    private int yearsOfExperience;
    private String desiredPosition;
    private String aboutMe;
}
