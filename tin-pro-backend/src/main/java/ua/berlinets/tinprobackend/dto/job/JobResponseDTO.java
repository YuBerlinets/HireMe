package ua.berlinets.tinprobackend.dto.job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String location;
    private String status;
    private Instant date;
    private String company;
}
