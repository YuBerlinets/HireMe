import { useNavigate } from "react-router-dom";
import { PostedJob } from "../models/UserModels";

interface RecruiterPostedJobsProps {
    jobs: PostedJob[];
}


export default function RecruiterPostedJobs({ jobs }: RecruiterPostedJobsProps) {
    const navigate = useNavigate();
    return (
        <div className="recruiter_jobs_list">
            {jobs.map((job, index) => (
                <div key={index} className="recruiter_job" onClick={() => navigate(`/jobs/${job.id}`)}>
                    <div className="job_title">{job.title}</div>
                    <div className="job_location">{job.location}</div>
                    <div className="job_date">{job.date}</div>
                    <div className="job_status">{job.status}</div>
                </div>
            ))}
        </div>
    );
}