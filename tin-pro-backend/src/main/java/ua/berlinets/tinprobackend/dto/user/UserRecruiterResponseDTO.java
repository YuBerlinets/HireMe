package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserRecruiterResponseDTO extends UserResponseDTO {
    private String company;
    private String position;
}
