package ua.berlinets.tinprobackend.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.berlinets.tinprobackend.repositories.RecruiterRepository;

@Service
@AllArgsConstructor
public class RecruiterService {
    private final RecruiterRepository recruiterRepository;
}
