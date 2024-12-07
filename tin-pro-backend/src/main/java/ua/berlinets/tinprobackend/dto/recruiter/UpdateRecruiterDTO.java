package ua.berlinets.tinprobackend.dto.recruiter;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.berlinets.tinprobackend.dto.user.UpdateUserDTO;

@Data
@EqualsAndHashCode(callSuper = true)
public class UpdateRecruiterDTO extends UpdateUserDTO {
    private String company;
    private String position;
}
