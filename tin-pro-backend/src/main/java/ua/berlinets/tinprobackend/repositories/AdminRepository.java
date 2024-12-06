package ua.berlinets.tinprobackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.berlinets.tinprobackend.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}
