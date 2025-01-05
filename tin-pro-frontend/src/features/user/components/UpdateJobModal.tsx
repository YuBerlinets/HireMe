import { Input, Modal } from "antd";
import { useState, useEffect } from "react";
import { PostedJob } from "../models/UserModels";
import { api } from "../../../app/api/ApiConfig";
import { useTranslation } from "react-i18next";

interface UpdateJobModalProps {
    job: PostedJob;
    visible: boolean;
    onClose: () => void;
}

export interface UpdateJobData {
    title: string;
    location: string;
    date: string;
    status: string;
}

export default function UpdateJobModal({ job, visible, onClose }: UpdateJobModalProps) {
    const [updatedJob, setUpdatedJob] = useState<UpdateJobData>({
        title: job.title,
        location: job.location,
        date: job.date,
        status: job.status,
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (job) {
            setUpdatedJob({
                title: job.title,
                location: job.location,
                date: job.date,
                status: job.status,
            });
            setSuccess(false);
            setError("");
        }
    }, [job]);

    const handleUpdateJob = async () => {
        setError("");
        if (!updatedJob.title || !updatedJob.location || !updatedJob.date || !updatedJob.status) {
            setError("All fields are required");
            return;
        }
        try {
            const response = await api.job.updateJob(job.id, updatedJob);
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "An error occurred while updating the job.");
        }
    };

    return (
        <>
            <Modal
                open={visible}
                title={t("account.updateJob")}
                onCancel={onClose}
                onOk={handleUpdateJob}
                footer={[
                    <button className="action_button update_button" key="submit" onClick={handleUpdateJob}>
                        {t("buttons.update")}
                    </button>
                ]}
            >
                {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>Job updated successfully</div>}
                <span className="update_job_labe">{t('job.title')}</span>
                <Input
                    placeholder="Title"
                    value={updatedJob.title}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, title: e.target.value })}
                />
                <span className="update_job_labe">{t('job.location')}</span>
                <Input
                    placeholder="Location"
                    value={updatedJob.location}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, location: e.target.value })}
                />
                <span className="update_job_labe">{t('job.date')}</span>
                <Input
                    placeholder="Date"
                    value={updatedJob.date}
                    disabled
                />
                <span className="update_job_labe">{t('job.status')}</span>
                <Input
                    placeholder="Status"
                    value={updatedJob.status}
                    onChange={(e) => setUpdatedJob({ ...updatedJob, status: e.target.value })}
                />
            </Modal>
        </>
    );
}
