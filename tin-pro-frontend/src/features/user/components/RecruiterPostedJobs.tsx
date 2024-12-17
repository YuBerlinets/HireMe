import { useNavigate } from "react-router-dom";
import { PostedJob } from "../models/UserModels";
import UpdateJobModal from "./UpdateJobModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface RecruiterPostedJobsProps {
    jobs: PostedJob[];
}

export default function RecruiterPostedJobs({ jobs }: RecruiterPostedJobsProps) {
    const [isUpdateJobModalVisible, setIsUpdateJobModalVisible] = useState(false);
    const [currentJob, setCurrentJob] = useState<PostedJob | null>(null);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const openUpdateJobModal = (job: PostedJob, event: React.MouseEvent) => {
        event.stopPropagation();
        console.log(job);
        setCurrentJob(job);
        setIsUpdateJobModalVisible(true);
    };

    const closeUpdateJobModal = () => {
        setIsUpdateJobModalVisible(false);
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
                {(!jobs || jobs.length === 0) && <div className="no_jobs">{t('account.noJobsYet')}</div>}
                {jobs?.map((job) => (
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
                    </div>
                ))}
            </div>
        </>
    );
}
