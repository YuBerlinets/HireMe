package ua.berlinets.tinprobackend.services;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.dto.job.*;
import ua.berlinets.tinprobackend.entities.*;
import ua.berlinets.tinprobackend.repositories.JobCandidateRepository;
import ua.berlinets.tinprobackend.repositories.JobRepository;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@AllArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final JobCandidateRepository jobCandidateRepository;
    private final ModelMapper modelMapper;

    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public JobResponseDTO getJobResponseById(Long id) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job == null)
            return null;
        JobResponseDTO jobResponseDTO = modelMapper.map(job, JobResponseDTO.class);
        jobResponseDTO.setRecruiterName(job.getRecruiter().getUser().getFirstName() + " " + job.getRecruiter().getUser().getLastName());
        jobResponseDTO.setCompany(job.getRecruiter().getCompany());
        jobResponseDTO.setDate(getFormattedDate(job.getDatePosted()));
        return jobResponseDTO;
    }

    public JobPaginationDTO getJobs(Pageable pageable) {
        Page<Job> jobPage = jobRepository.findAll(pageable);

        List<JobListResponseDTO> jobsList = jobPage.stream().map(job -> {
                    JobListResponseDTO jobListResponseDTO = new JobListResponseDTO();
                    modelMapper.map(job, jobListResponseDTO);
                    jobListResponseDTO.setCompany(job.getRecruiter().getCompany());
                    jobListResponseDTO.setDate(getFormattedDate(job.getDatePosted()));
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

    public List<JobResponseDTO> getJobsByRecruiter(Recruiter recruiter) {
        List<Job> jobs = jobRepository.findAllByRecruiter(recruiter);
        return jobs.stream().map(job -> {
                    JobResponseDTO jobResponseDTO = new JobResponseDTO();
                    modelMapper.map(job, jobResponseDTO);
                    jobResponseDTO.setCompany(job.getRecruiter().getCompany());
                    jobResponseDTO.setDate(getFormattedDate(job.getDatePosted()));
                    return jobResponseDTO;
                }
        ).toList();
    }

    public List<PostedJobDTO> getPostedJobs(Recruiter recruiter) {
        List<Job> jobs = jobRepository.findAllByRecruiter(recruiter);
        return jobs.stream().map(job -> {
            PostedJobDTO postedJobDTO = new PostedJobDTO();
            modelMapper.map(job, postedJobDTO);
            postedJobDTO.setDatePosted(getShortFormattedDate(job.getDatePosted()));
            return postedJobDTO;
        }).toList();
    }

    private String getFormattedDate(Instant date) {
        ZonedDateTime zonedDateTime = date.atZone(ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm dd.MM.yyyy");
        return zonedDateTime.format(formatter);
    }

    private String getShortFormattedDate(Instant date) {
        ZonedDateTime zonedDateTime = date.atZone(ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        return zonedDateTime.format(formatter);
    }

    public void assignCandidate(Job job, Candidate candidate, Recruiter recruiter) {
        JobCandidate jobCandidate = new JobCandidate();
        jobCandidate.setJob(job);
        jobCandidate.setCandidate(candidate);
        jobCandidate.setRecruiter(recruiter);
        jobCandidate.setStatus("PENDING");
        jobCandidateRepository.save(jobCandidate);
    }

    public void updateJob(Job job, UpdateJobDTO updateJobDTO) {
        if (updateJobDTO.getTitle() != null) {
            job.setTitle(updateJobDTO.getTitle());
        }
        if (updateJobDTO.getDescription() != null) {
            job.setDescription(updateJobDTO.getDescription());
        }
        if (updateJobDTO.getLocation() != null) {
            job.setLocation(updateJobDTO.getLocation());
        }
        jobRepository.save(job);
    }

    public void deleteJob(Job job) {
        jobRepository.delete(job);
    }

//    public void unassignCandidate(Job job, Candidate candidate, Recruiter recruiter) {
//        JobCandidate jobCandidate = jobCandidateRepository.findByJobAndCandidateAndRecruiter(job, candidate, recruiter).orElse(null);
//        if (jobCandidate != null) {
//            jobCandidateRepository.delete(jobCandidate);
//        }
//    }
}
