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
        firstName: "",
        lastName: "",
        email: "",
        aboutMe: "",
        yearsOfExperience: 0,
        desiredSalary: 0.0,
        desiredPosition: "",
        skills: "",
        cv: new Blob()
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
        <>
            <h1>Candidate Page</h1>
            <div className="candidate_page">
                <div className="candidate_info">
                    <p className="about_me_text">
                        {candidate.aboutMe}
                    </p>
                    <div className="skills">
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
                    <div className="experience_years">
                        Years: {candidate.yearsOfExperience}
                    </div>
                    {isUserRecruiter && (
                        <div className="candidate_cv">
                            Candidate cv template
                        </div>
                    )}
                </div>
                <div className="candidate_desc">
                    <span className="candidate_desc_inner">{candidate.firstName + " " + candidate.lastName}</span>
                    <span className="candidate_desc_inner">{t('candidate.list.position', { position: candidate.desiredPosition })}</span>
                    <span className="candidate_desc_inner">{t('candidate.list.salary', { salary: candidate.desiredSalary })}</span>
                </div>
            </div>
        </>
    )
};