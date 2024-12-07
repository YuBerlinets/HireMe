package ua.berlinets.tinprobackend.dto.user;


import lombok.Data;

@Data
public class CandidateResponseDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String aboutMe;
    private int yearsOfExperience;
    private String desiredPosition;
    private String skills;
    private byte[] cv;
}
