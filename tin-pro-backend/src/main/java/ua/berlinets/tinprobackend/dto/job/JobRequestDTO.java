package ua.berlinets.tinprobackend.dto.job;

import lombok.Data;

import java.time.Instant;

@Data
public class JobRequestDTO {
    private String title;
    private String description;
    private String location;
    private Instant datePosted;
}
