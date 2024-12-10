import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function JobPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const { t } = useTranslation();

    return (
        <div className="container">
            <h1 className="job_main_title">{t('job.job')}</h1>
            <div className="job_page">
                <div className="job_info">
                    <div className="job_title">{t('job.title')}</div>
                    <div className="job_company">{t('job.company')}</div>
                    <div className="job_location">{t('job.location')}</div>
                    <div className="job_status">{t('job.status')}</div>
                    <div className="job_date">{t('job.date')}</div>
                </div>
            </div>
        </div>
    );
}