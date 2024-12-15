import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { api } from "../../app/api/ApiConfig";

interface Job {
    id: number;
    recruiterName: string;
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
        recruiterName: "",
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
            <h1 className="job_main_title">{t('job.job') + " • " + job.title}</h1>
            <div className="job_page_content">
                <div className="job_info">
                    <div className="job_field">
                        <span className="job_field_label">{t("job.company")}: </span>
                        <span className="job_field_value">{job.company}</span>
                    </div>
                    <div className="job_field">
                        <span className="job_field_label">{t("job.location")}: </span>
                        <span className="job_field_value">{job.location}</span>
                    </div>
                    <div className="job_field">
                        <span className="job_field_label">{t("job.status")}: </span>
                        <span className="job_field_value">{job.status}</span>
                    </div>
                    <div className="job_field">
                        <span className="job_field_label">{t("job.date")}: </span>
                        <span className="job_field_value">{job.date}</span>
                    </div>
                    <div className="job_field job_description">
                        <span className="job_field_label">{t("job.description")}: </span>
                        <span className="job_field_value">{job.description}</span>
                    </div>
                </div>
                <div className="posted_by">
                    <h2>{t("job.postedBy")}</h2>
                    <span>{t("job.postedByRecruiter")}: {job.recruiterName}</span>
                    <span>{t("job.postedByCompany")}: {job.company}</span>

                </div>
            </div>
        </div>
    );
}