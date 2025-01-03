package ua.berlinets.tinprobackend.services.initializers;


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final DataInitializationService dataInitializationService;

    public DataLoader(DataInitializationService dataInitializationService) {
        this.dataInitializationService = dataInitializationService;
    }

    @Override
    public void run(String... args) throws Exception {
        dataInitializationService.initData();
    }
}
