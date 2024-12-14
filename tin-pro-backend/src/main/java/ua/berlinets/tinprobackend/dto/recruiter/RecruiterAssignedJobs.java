package ua.berlinets.tinprobackend.dto.recruiter;

import lombok.Data;

@Data
public class RecruiterAssignedJobs {
    private Long jobCandidateId;
    private Long candidateId;
    private String candidateName;
    private Long jobId;
    private String jobTitle;
    private String status;
}
