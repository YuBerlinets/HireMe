package ua.berlinets.tinprobackend.dto.job;

import lombok.Data;

@Data
public class UpdateJobDTO {
    private String title;
    private String description;
    private String location;
}
