package ua.berlinets.tinprobackend.dto.candidate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidatesPaginationDTO {
    private List<ListCandidateResponseDTO> candidates;
    private int currentPage;
    private int totalPages;
    private long totalElements;
}
