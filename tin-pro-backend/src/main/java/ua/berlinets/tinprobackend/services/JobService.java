package ua.berlinets.tinprobackend.services;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.dto.job.JobListResponseDTO;
import ua.berlinets.tinprobackend.dto.job.JobPaginationDTO;
import ua.berlinets.tinprobackend.dto.job.JobRequestDTO;
import ua.berlinets.tinprobackend.dto.job.JobResponseDTO;
import ua.berlinets.tinprobackend.entities.Job;
import ua.berlinets.tinprobackend.entities.User;
import ua.berlinets.tinprobackend.repositories.JobRepository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;

    public JobResponseDTO getJobById(Long id) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job == null)
            return null;
        JobResponseDTO jobResponseDTO = modelMapper.map(job, JobResponseDTO.class);

        jobResponseDTO.setCompany(job.getRecruiter().getCompany());

        return jobResponseDTO;
    }

    public JobPaginationDTO getJobs(Pageable pageable) {
        Page<Job> jobPage = jobRepository.findAll(pageable);

        List<JobListResponseDTO> jobsList = jobPage.stream().map(job -> {
                    JobListResponseDTO jobListResponseDTO = new JobListResponseDTO();
                    modelMapper.map(job, jobListResponseDTO);
                    jobListResponseDTO.setCompany(job.getRecruiter().getCompany());
                    return jobListResponseDTO;
                }
        ).toList();

        return new JobPaginationDTO(
                jobsList,
                jobPage.getNumber(),
                jobPage.getTotalPages(),
                jobPage.getTotalElements()
        );

    }


    public void postJob(User user, JobRequestDTO jobRequestDTO) {
        Job job = new Job();
        job.setRecruiter(user.getRecruiter());
        job.setTitle(jobRequestDTO.getTitle());
        job.setDescription(jobRequestDTO.getDescription());
        job.setLocation(jobRequestDTO.getLocation());
        job.setStatus("ACTIVE");
        job.setDatePosted(Instant.now());

        jobRepository.save(job);
    }
}
