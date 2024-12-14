import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/store/store"
import CandidateCard from "../user/components/CandidateCard"
import { Timeline } from "antd"
import { api } from "../../app/api/ApiConfig"
import { useParams } from "react-router-dom"
import AssignCandidateModal from "./components/AssignCandidateModal"
import CandidateCVViewer from "./components/CandidateCVViewer"

export interface Candidate {
    firstName: string
    lastName: string
    email: string
    aboutMe: string
    yearsOfExperience: number
    desiredPosition: string
    desiredSalary: string
    skills: string,
    cvName: string,
    cv: Blob | null
}

export default function CandidatePage() {
    const { candidateId } = useParams<{ candidateId: string }>();
    const [isAssignCandidateModalVisible, setAssignCandidateModalVisibility] = useState(false);
    const [isCVViewerVisible, setCVViewerVisibility] = useState(false);
    const [candidate, setCandidate] = useState<Candidate>({
        firstName: "",
        lastName: "",
        email: "",
        aboutMe: "",
        yearsOfExperience: 5,
        desiredPosition: "",
        desiredSalary: "",
        skills: "",
        cvName: "",
        cv: null,
    });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [isUserRecruiter, setUserRecruiter] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    const { t } = useTranslation();

    const fetchCandidate = async () => {
        if (!candidateId) return;

        try {
            const response = await api.candidate.getCandidateInformation(candidateId);
            const data = response.data;
            if (data.cv) {
                const binaryData = base64ToArrayBuffer(data.cv);
                const blob = new Blob([binaryData], { type: "application/pdf" });
                data.cv = blob;
            }


            setCandidate(data);
        } catch (error) {
            console.error("Error fetching candidate", error);
        }
    };

    function base64ToArrayBuffer(base64: string): Uint8Array {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }


    useEffect(() => {
        if (user?.role === "RECRUITER") {
            setUserRecruiter(true);
        }
        fetchCandidate();
    }, [user]);

    const handleAssignCandidateModalVisibility = () => {
        setAssignCandidateModalVisibility(!isAssignCandidateModalVisible);
    }

    const handleCVViewerVisibility = () => {
        setCVViewerVisibility(!isCVViewerVisible);
    }

    return (
        <>
            {isUserRecruiter && (
                <AssignCandidateModal
                    isOpen={isAssignCandidateModalVisible}
                    candidateId={parseInt(candidateId!)}
                    onClose={handleAssignCandidateModalVisibility}
                />
            )}
            {isUserRecruiter && candidate.cv && candidate.cvName && (
                <CandidateCVViewer
                    open={isCVViewerVisible}
                    cvName={candidate.cvName}
                    cv={candidate.cv}
                    onClose={handleCVViewerVisibility}
                />
            )}
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
                                    <button
                                        className="action_button open_cv_modal"
                                        onClick={() => handleCVViewerVisibility()}
                                    >
                                        {t('candidate.downloadCV')}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="candidate_desc">
                        <CandidateCard data={candidate} />
                        {isUserRecruiter && (
                            <button className="action_button assign_candidate" onClick={handleAssignCandidateModalVisibility}>{t('candidate.assign')}</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
};