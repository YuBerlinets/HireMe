import { PostedJob, Recruiter } from "./models/UserModels";
import { Field } from "./components/Field";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import RecruiterPostedJobs from "./components/RecruiterPostedJobs";
import { api } from "../../app/api/ApiConfig";
import AssignedCandidates from "./components/AssignedCandidates";



interface RecruiterAccountProps {
    data: Recruiter;
}

interface UpdateRecruiterData {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    company: string;
}

export interface AssignedCandidate {
    candidateId: number,
    candidateName: string,
    jobId: number,
    jobTitle: string,
    jobLocation: string,
    status: string,
}

export default function RecruiterAccount({ data }: RecruiterAccountProps) {
    const [formData, setFormData] = useState<UpdateRecruiterData>({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        position: data.position,
        company: data.company,
    });
    const [assignedCandidates, setAssignedCandidates] = useState<AssignedCandidate[]>([]);

    const { t } = useTranslation();

    const handleInputChange = (field: keyof Recruiter, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    useEffect(() => {
        const fetchAssignedCandidates = async () => {
            try {
                const response = await api.recruiter.assignedCandidatesJobs();
                setAssignedCandidates(response.data);
            } catch (error) {
                console.error("Error fetching assigned candidates", error);
            }
        };
        fetchAssignedCandidates();
    }, []);

    return (
        <>
            <div className="recruiter_acc_page">
                <div className="recruiter_fields">
                    <h2 className="block_title">{t('account.personalInformation')}</h2>
                    <div className="personal_information">
                        <div className="account_field">
                            <span>{t('account.firstName')}</span>
                            <Input
                                value={formData.firstName}
                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                placeholder={t('account.firstName')}
                            />
                        </div>
                        <div className="account_field">
                            <span>{t('account.lastName')}</span>
                            <Input
                                value={formData.lastName}
                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                placeholder={t('account.lastName')}
                            />
                        </div>

                        <div className="account_field">
                            <span>{t('account.recruiterPosition')}</span>
                            <Input
                                value={formData.position}
                                onChange={(e) => handleInputChange("position", e.target.value)}
                                placeholder={t('account.recruiterPosition')}
                            />
                        </div>
                        <div className="account_field">
                            <span>{t('account.email')}</span>
                            <Input value={formData.email} disabled />
                        </div>

                        <div className="account_field">
                            <span>{t('account.company')}</span>
                            <Input
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                placeholder={t('account.company')}
                            />
                        </div>

                        <button className="action_button save_acc_button">{t('buttons.save')}</button>

                    </div>
                </div>
                <div className="recruiter_jobs">
                    <h2 className="block_title">{t('account.recruiterJobs')}</h2>
                    <RecruiterPostedJobs
                        jobs={data.jobs}
                    />
                </div>
            </div>
            <AssignedCandidates assignedCandidates={assignedCandidates} />
        </>
    );
}
