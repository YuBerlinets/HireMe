package ua.berlinets.tinprobackend.dto.user;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.berlinets.tinprobackend.dto.job.JobListResponseDTO;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserRecruiterResponseDTO extends UserResponseDTO {
    private String company;
    private String position;
    private List<JobListResponseDTO> jobs;
}
