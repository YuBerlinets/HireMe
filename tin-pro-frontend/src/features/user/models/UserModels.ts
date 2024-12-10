export interface User {
    firstName: string;
    lastName: string;
    email: string;
    role: 'CANDIDATE' | 'RECRUITER';
}

export interface Candidate extends User {
    aboutMe: string;
    yearsOfExperience: number;
    desiredPosition: string;
    desiredSalary: string;
    skills: string;
    cvName: string;
    cv: Blob | null;
}

export interface Recruiter extends User {
    company: string;
    position: string;
}

export type UserData = Candidate | Recruiter;
