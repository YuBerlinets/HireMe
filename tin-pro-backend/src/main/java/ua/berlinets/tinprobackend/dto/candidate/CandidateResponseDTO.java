package ua.berlinets.tinprobackend.dto.candidate;


import lombok.Data;

@Data
public class CandidateResponseDTO implements ICandidateResponseDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String aboutMe;
    private int yearsOfExperience;
    private String desiredSalary;
    private String desiredPosition;
    private String skills;
    private String cvName;
    private byte[] cv;
}
