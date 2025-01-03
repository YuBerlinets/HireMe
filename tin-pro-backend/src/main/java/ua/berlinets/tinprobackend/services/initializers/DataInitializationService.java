package ua.berlinets.tinprobackend.services.initializers;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.entities.*;
import ua.berlinets.tinprobackend.enums.RoleEnum;
import ua.berlinets.tinprobackend.repositories.*;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

// kindly asked chatgpt to generate me this data to insert
// https://chatgpt.com/share/67782f0c-cf6c-8010-a07a-5742297a7be4

@Service
@AllArgsConstructor
public class DataInitializationService {
    private UserRepository userRepository;
    private RecruiterRepository recruiterRepository;
    private CandidateRepository candidateRepository;
    private JobRepository jobRepository;
    private JobCandidateRepository jobCandidateRepository;
    private AdminRepository adminRepository;
    private PasswordEncoder passwordEncoder;

    public void initData() {
        if (userRepository.count() == 0) {
            User adminUser = new User();
            adminUser.setEmail("admin@hire.me");
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setRole(RoleEnum.ADMIN);
            Admin admin = new Admin();
            admin.setUser(adminUser);

            userRepository.save(adminUser);
            adminRepository.save(admin);
        }

        if (candidateRepository.count() == 0) {
            for (int i = 1; i <= 20; i++) {
                Candidate candidate = createCandidate("Candidate " + i);
                candidateRepository.save(candidate);
            }
        }

        if (recruiterRepository.count() == 0) {
            Recruiter recruiter1 = createRecruiter("Recruiter 1", "Company A");
            Recruiter recruiter2 = createRecruiter("Recruiter 2", "Company B");
            Recruiter recruiter3 = createRecruiter("Recruiter 3", "Company C");

            recruiterRepository.saveAll(Arrays.asList(recruiter1, recruiter2, recruiter3));
        }

        if (jobRepository.count() == 0) {
            List<Recruiter> recruiters = recruiterRepository.findAll();
            for (int i = 1; i <= 20; i++) {
                Job job = createJob("Job " + i, recruiters.toArray(new Recruiter[0]));
                jobRepository.save(job);
            }
        }

        List<Candidate> candidates = candidateRepository.findAll();
        List<Recruiter> recruiters = recruiterRepository.findAll();
        List<Job> jobs = jobRepository.findAll();

        Random random = new Random();
        int maxConnectionsPerCandidate = 5;

        for (Candidate candidate : candidates) {
            int connectionsToCreate = random.nextInt(maxConnectionsPerCandidate) + 1;

            for (int i = 0; i < connectionsToCreate; i++) {
                Recruiter recruiter = recruiters.get(random.nextInt(recruiters.size()));
                Job job = jobs.get(random.nextInt(jobs.size()));

                JobCandidate jobCandidate = new JobCandidate();
                jobCandidate.setJob(job);
                jobCandidate.setCandidate(candidate);
                jobCandidate.setRecruiter(recruiter);
                jobCandidate.setStatus("Applied");

                jobCandidateRepository.save(jobCandidate);
            }
        }
    }


    private Recruiter createRecruiter(String name, String company) {
        User recruiterUser = new User();
        recruiterUser.setEmail(name.toLowerCase().replace(" ", "") + "@hire.me");
        recruiterUser.setFirstName(name.split(" ")[0]);
        recruiterUser.setLastName(name.split(" ")[1]);
        recruiterUser.setPassword(passwordEncoder.encode("recruiter"));
        recruiterUser.setRole(RoleEnum.RECRUITER);
        userRepository.save(recruiterUser);

        Recruiter recruiter = new Recruiter();
        recruiter.setUser(recruiterUser);
        recruiter.setCompany(company);
        recruiter.setPosition("Recruiter");
        return recruiter;
    }

    private Candidate createCandidate(String name) {
        User candidateUser = new User();
        candidateUser.setEmail(name.toLowerCase().replace(" ", "") + "@hire.me");
        candidateUser.setFirstName(name.split(" ")[0]);
        candidateUser.setLastName(name.split(" ")[1]);
        candidateUser.setPassword(passwordEncoder.encode("candidate"));
        candidateUser.setRole(RoleEnum.CANDIDATE);
        userRepository.save(candidateUser);

        Candidate candidate = new Candidate();
        candidate.setUser(candidateUser);
        candidate.setYearsOfExperience(new Random().nextInt(20));
        candidate.setDesiredPosition("Software Engineer");
        candidate.setDesiredSalary("1000 - 2000");
        candidate.setSkills("Java, Spring, AWS, Docker, Kubernetes, Jenkins, Git");
        candidate.setAboutMe("As a software engineer, I combine creative problem-solving skills with technical expertise to develop solutions that meet user needs and exceed expectations. With a strong background in object-oriented programming and cloud technologies, I have worked on a variety of projects, from web development to mobile apps. I value clean, modular code and take pride in optimizing software performance and scalability. Continuously expanding my knowledge, I am always ready to tackle new challenges and push the boundaries of what's possible.");
        candidate.setCvName("CV_" + name);
        candidate.setCv(new byte[0]);

        return candidate;
    }

    private Job createJob(String title, Recruiter... recruiters) {
        Job job = new Job();
        job.setTitle(title);
        job.setDescription("Job description");
        job.setLocation("New York");
        job.setStatus("OPEN");
        job.setDatePosted(Instant.now());

        Recruiter randomRecruiter = recruiters[new Random().nextInt(recruiters.length)];
        job.setRecruiter(randomRecruiter);

        return job;
    }
}
