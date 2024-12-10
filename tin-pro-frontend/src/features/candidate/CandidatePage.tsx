import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/store/store"
import CandidateCard from "../user/components/CandidateCard"
import { Timeline } from "antd"
import { api } from "../../app/api/ApiConfig"
import { useParams } from "react-router-dom"

export interface Candidate {
    firstName: string
    lastName: string
    email: string
    aboutMe: string
    yearsOfExperience: number
    desiredPosition: string
    desiredSalary: string
    skills: string
    cv: Blob | null
}

export default function CandidatePage() {
    const { candidateId } = useParams<{ candidateId: string }>();
    const [candidate, setCandidate] = useState<Candidate>({
        firstName: "",
        lastName: "",
        email: "",
        aboutMe: "",
        yearsOfExperience: 5,
        desiredPosition: "",
        desiredSalary: "",
        skills: "",
        cv: null,
    });
    const [isUserRecruiter, setUserRecruiter] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    const { t } = useTranslation();

    const fetchCandidate = async () => {
        if (!candidateId) return;

        try {
            const response = await api.candidate.getCandidateInformation(candidateId);
            const data = response.data;
            if (data.cv) {
                data.cv = new Blob([data.cv], { type: "application/pdf" });
            }
            // console.log(data)
            setCandidate(data);
        } catch (error) {
            console.error("Error fetching candidate", error);
        }
    };

    useEffect(() => {
        if (user?.role === "RECRUITER") {
            setUserRecruiter(true);
        }
        fetchCandidate();
    }, [user]);

    return (
        <div className="container">

            <div className="candidate_page">
                <div className="candidate_info">
                    <h1>{candidate.desiredPosition}</h1>

                    <div className="skills">
                        <p className="section_title">{t('candidate.titles.skills')}</p>
                        <div className="skills_list">

                            {candidate.skills &&
                                candidate.skills.length > 0 &&
                                candidate.skills.split(",").map((skill, index) => {
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
                        <span className="experience_text">
                            {t('candidate.list.years', { years: candidate.yearsOfExperience })}
                        </span>
                        {isUserRecruiter && (
                            <Timeline
                                pending="More years to come"

                                items={[
                                    {
                                        children: 'Senior Developer 2015-09-01',
                                        color: '#161A30',
                                    },
                                    {
                                        children: 'Middle Developer 2015-09-01',
                                        color: '#161A30'
                                    },
                                    {
                                        children: 'Junior Developer 2015-09-01',
                                        color: '#161A30'
                                    },
                                    {
                                        children: 'Intern 2015-09-01',
                                        color: '#161A30'
                                    },
                                ]}
                                className="years_timeline"
                            />
                        )
                        }
                    </div>

                    {isUserRecruiter && (
                        <div className="candidate_cv">
                            <p className="section_title">{t('candidate.titles.cv')}</p>
                            {candidate.cv && (
                                <a href={URL.createObjectURL(candidate.cv)} download>
                                    {t('candidate.download')}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                <div className="candidate_desc">
                    <CandidateCard data={candidate} />
                </div>
            </div>
        </div>

    )
};