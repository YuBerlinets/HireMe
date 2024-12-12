package ua.berlinets.tinprobackend.dto.job;

import lombok.Data;

@Data
public class PostedJobDTO {
    private Long id;
    private String title;
    private String location;
    private String datePosted;
}
