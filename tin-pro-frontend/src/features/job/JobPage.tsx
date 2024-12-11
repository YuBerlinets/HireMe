import { use } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { api } from "../../app/api/ApiConfig";

interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    status: string;
    date: string;
    company: string;
}



export default function JobPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const [job, setJob] = useState<Job>({
        id: 0,
        title: "",
        description: "",
        location: "",
        status: "",
        date: "",
        company: "",
    });
    const { t } = useTranslation();

    const fetchJob = async () => {
        if (!jobId) return;

        try {
            const response = await api.job.getJobById(jobId);
            const data = response.data;
            setJob(data);
        } catch (error) {
            console.error("Error fetching job", error);
        }
    };


    useEffect(() => {
        fetchJob();
    }, []);

    return (
        <div className="container">
            <h1 className="job_main_title">{job.title}</h1>
            <div className="job_page">
                <div className="job_info">
                    <div className="job_title">{job.company}</div>
                    <div className="job_description">{job.description}</div>
                    <div className="job_location">{job.location}</div>
                    <div className="job_status">{job.status}</div>
                    <div className="job_date">{job.date}</div>
                    <div className="job_company">{job.company}</div>
                </div>
            </div>
        </div>
    );
}