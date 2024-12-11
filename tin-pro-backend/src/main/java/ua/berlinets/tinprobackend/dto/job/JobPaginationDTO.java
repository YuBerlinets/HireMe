package ua.berlinets.tinprobackend.dto.job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobPaginationDTO {
    private List<JobListResponseDTO> jobs;
    private int currentPage;
    private int totalPages;
    private long totalElements;
}
