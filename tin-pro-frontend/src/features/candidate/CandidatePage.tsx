import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/store/store"

export interface Candidate {
    firstName: string
    lastName: string
    email: string
    aboutMe: string
    yearsOfExperience: number
    desiredPosition: string
    desiredSalary: number
    skills: string
    cv: Blob
}

export default function CandidatePage() {
    const [candidate, setCandidate] = useState<Candidate>({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        aboutMe: "A passionate software developer with expertise in full-stack development, eager to contribute to cutting-edge projects.",
        yearsOfExperience: 5,
        desiredPosition: "Senior Software Engineer",
        desiredSalary: 120000,
        skills: "JavaScript, TypeScript, React, Node.js, Java, Spring Boot, SQL, AWS, Node.js, Java, Spring Boot, SQL, Spring Boot, SQL, AWS, Node.js, Java, Spring Boot, AWS",
        cv: new Blob(["Sample CV content"], { type: "application/pdf" }),
    });
    const [isUserRecruiter, setUserRecruiter] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (user?.role === "RECRUITER") {
            setUserRecruiter(true);
        }

    }, [user]);

    const { t } = useTranslation();
    return (
        <div className="container">

            <div className="candidate_page">
                <div className="candidate_info">
                    <h1>{candidate.desiredPosition}</h1>
                    <div className="skills">
                        <p className="section_title">{t('candidate.titles.skills')}</p>
                        <div className="skills_list">

                            {candidate.skills.split(",").map((skill, index) => {
                                return (
                                    <div key={index} className="skill_bar">
                                        <span className="skill_bar_inner">
                                            {skill}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="about_me">
                        <p className="section_title">{t('candidate.titles.aboutMe')}</p>
                        <p className="about_me_text">
                            {candidate.aboutMe}
                        </p>
                    </div>

                    <div className="experience_years">
                        <p className="section_title">{t('candidate.titles.years')}</p>
                        Years: {candidate.yearsOfExperience}
                    </div>
                    {isUserRecruiter && (
                        <div className="candidate_cv">
                            <p className="section_title">{t('candidate.titles.cv')}</p>
                            <a href={URL.createObjectURL(candidate.cv)} download>
                                {t('candidate.download')}
                            </a>
                        </div>
                    )}
                </div>
                <div className="candidate_desc">
                    <span className="candidate_desc_inner">{candidate.firstName + " " + candidate.lastName}</span>
                    <span className="candidate_desc_inner">{t('candidate.list.position', { position: candidate.desiredPosition })}</span>
                    <span className="candidate_desc_inner">{t('candidate.list.salary', { salary: candidate.desiredSalary })}</span>
                </div>
            </div>
        </div>

    )
};