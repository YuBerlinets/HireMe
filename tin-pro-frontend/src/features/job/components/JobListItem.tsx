import { useNavigate } from "react-router-dom";
import { JobItem } from "../JobsPage";

interface JobListItemProps {
    job: JobItem;
}

export default function JobListItem({ job }: JobListItemProps) {
    const navigate = useNavigate();

    return (
        <div className="job_item" onClick={() => navigate(`/jobs/${job.id}`)}>
            <div className="job_title">{job.title}</div>
            <div className="job_company">{job.company}</div>
            <div className="job_location">{job.location}</div>
            <div className="job_status">{job.status}</div>
            <div className="job_date">{job.date}</div>
        </div>
    );
}