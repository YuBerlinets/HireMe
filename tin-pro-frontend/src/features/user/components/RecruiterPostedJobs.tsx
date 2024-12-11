import { useNavigate } from "react-router-dom";
import { PostedJob } from "../models/UserModels";

interface RecruiterPostedJobsProps {
    jobs: PostedJob[];
}


export default function RecruiterPostedJobs({ jobs }: RecruiterPostedJobsProps) {
    const navigate = useNavigate();
    return (
        <div className="recruiter_jobs_list">
            {!jobs && <div className="no_jobs">No jobs posted yet</div>}
            {jobs && jobs.length > 0 && jobs.map((job, index) => (
                <div key={index} className="recruiter_job" onClick={() => navigate(`/jobs/${job.id}`)}>
                    <h3 className="recruiter__job-title">{job.title}</h3>
                    <span className="recruiter__job-company">{job.company}</span>
                    <span className="recruiter__job-location">{job.location}</span    >
                    <span className="recruiter__job-status">{job.status}</span>
                    <span className="recruiter__job-date">{job.date}</span>
                </div>
            ))}
        </div>
    );
}