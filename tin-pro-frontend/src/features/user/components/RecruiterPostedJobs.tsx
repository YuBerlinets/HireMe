import { useNavigate } from "react-router-dom";
import { PostedJob } from "../models/UserModels";
import UpdateJobModal from "./UpdateJobModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Popconfirm } from "antd";
import { api } from "../../../app/api/ApiConfig";

interface RecruiterPostedJobsProps {
    jobs: PostedJob[];
}

export default function RecruiterPostedJobs({ jobs }: RecruiterPostedJobsProps) {
    const [localJobs, setLocalJobs] = useState(jobs);
    const [isUpdateJobModalVisible, setIsUpdateJobModalVisible] = useState(false);
    const [currentJob, setCurrentJob] = useState<PostedJob | null>(null);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const openUpdateJobModal = (job: PostedJob, event: React.MouseEvent) => {
        event.stopPropagation();
        setCurrentJob(job);
        setIsUpdateJobModalVisible(true);
    };

    const closeUpdateJobModal = () => {
        setIsUpdateJobModalVisible(false);
    };

    const handleJobDelete = async (event: any, jobId: number) => {
        event.stopPropagation();
        try {
            const response = await api.job.deleteJob(jobId);
            if (response.status === 200) {
                setLocalJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
            }
        } catch (error) {
            console.error("Error deleting job", error);
        }
    };

    return (
        <>
            {currentJob && (
                <UpdateJobModal
                    visible={isUpdateJobModalVisible}
                    onClose={closeUpdateJobModal}
                    job={currentJob}
                />
            )}

            <div className="recruiter_jobs_list">
                {(!localJobs || localJobs.length === 0) && (
                    <div className="no_jobs">{t('account.noJobsYet')}</div>
                )}
                {localJobs?.map((job) => (
                    <div
                        key={job.id}
                        className="recruiter_job"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <h3 className="recruiter__job-title">{job.title}</h3>
                        <span className="recruiter__job-company">{job.company}</span>
                        <span className="recruiter__job-location">{job.location}</span>
                        <span className="recruiter__job-status">{job.status}</span>
                        <span className="recruiter__job-date">{job.date}</span>

                        <button
                            className="action_button recruiter__job-update"
                            onClick={(event) => openUpdateJobModal(job, event)}
                        >
                            {t('buttons.update')}
                        </button>
                        <Popconfirm
                            title={t('account.deletJob')}
                            description={t('account.deleteJobConfirm')}
                            onConfirm={(event) => handleJobDelete(event, job.id)}
                            okText={t('buttons.yes')}
                            cancelText={t('buttons.no')}
                            className="job_delete_popconfirm"
                        >
                            <button
                                className="action_button delete_job_button"
                                onClick={(event) => event.stopPropagation()}
                            >
                                {t('buttons.delete')}
                            </button>
                        </Popconfirm>
                    </div>
                ))}
            </div>
        </>
    );
}
