import { Modal, Select } from "antd";
import { api } from "../../../app/api/ApiConfig";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface AssignCandidateModalProps {
    isOpen: boolean;
    onClose: () => void;
    candidateId: number;
}

interface JobVacancy {
    id: number;
    title: string;
    location: string;
    datePosted: string;
}

export default function AssignCandidateModal({ isOpen, onClose, candidateId }: AssignCandidateModalProps) {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState<JobVacancy[]>([]);
    const [jobId, setJobId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getAllJobsByRecruiter = async () => {
        try {
            const response = await api.recruiter.postedJobs();
            setJobs(response.data);
        } catch (error) {
            setError("Error fetching jobs");
            console.error("Error fetching jobs", error);
        }
    };

    const handleAssignCandidate = async () => {
        if (!jobId || !candidateId) return;
        try {
            const response = await api.job.assignCandidateToJob(jobId, candidateId);
            if (response.status === 200) {
                onClose();
            }
        } catch (error) {
            setError("Error assigning candidate to job");
            console.error("Error assigning candidate to job", error);
        }
    };

    useEffect(() => {
        getAllJobsByRecruiter();
    }, []);

    return (
        <Modal
            onCancel={onClose}
            open={isOpen}
            title={t("job.assignCandidate")}
            footer={[
                <button key="back" className="action_button candidate_modal_close_button" onClick={onClose}>
                    {t("job.cancel")}
                </button>,
                <button key="submit" className="action_button candidate_modal_button" onClick={handleAssignCandidate}>
                    {t("job.assign")}
                </button>,
            ]}
        >

            <Select
                placeholder={t("job.selectJob")}
                className="assign_candidate_select"
                options={jobs.map((job) => ({
                    value: job.id,
                    label: `${job.title} - ${job.location} - ${job.datePosted}`,
                }))}
                onChange={(value: number) => setJobId(value)}
            />
            {error && <div className="modal_error">{error}</div>}
        </Modal>
    );
}
