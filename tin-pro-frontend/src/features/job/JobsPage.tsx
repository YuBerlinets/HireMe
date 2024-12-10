import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../app/api/ApiConfig";
import JobListItem from "./components/JobListItem";
import Footer from "../components/Footer";
import { Pagination } from "antd";

export interface JobItem {
    id: number;
    title: string;
    location: string;
    company: string;
    date: string;
    status: string;
}


export default function JobsPage() {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState<JobItem[]>([]);
    const [page, setPage] = useState(1);
    const size = 10;

    const fetchJobs = async (page: number, size: number) => {
        try {
            const response = await api.job.getJobs(page - 1, size);
            if (response.status === 200) {
                const data = response.data;
                setJobs(data);
            }
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };

    // useEffect(() => {
    //     fetchJobs(page, size);
    // }, [page, size]);

    const jobsTemplate: JobItem[] = [
        {
            id: 1,
            title: "Frontend Developer",
            location: "Remote",
            company: "Google",
            date: "2021-09-01",
            status: "Open"
        },
        {
            id: 2,
            title: "Backend Developer",
            location: "Remote",
            company: "Google",
            date: "2021-09-01",
            status: "Open"
        },
        {
            id: 3,
            title: "Fullstack Developer",
            location: "Remote",
            company: "Google",
            date: "2021-09-01",
            status: "Open"
        },
        {
            id: 4,
            title: "Frontend Developer",
            location: "Remote",
            company: "Google",
            date: "2021-09-01",
            status: "Open"
        },
        {
            id: 5,
            title: "Backend Developer",
            location: "Remote",
            company: "Google",
            date: "2021-09-01",
            status: "Open"
        },
        {
            id: 6,
            title: "Fullstack Developer",
            location: "Remote",
            company: "Google",
            date: "2021-09-01",
            status: "Open"
        }
    ]

    return (
        <>
            <div className="container">
                <div className="jobs_page">
                    <h1>{t('jobs.title')}</h1>
                    <p className="jobs_description">{t('jobs.description')}</p>
                    <div className="jobs_actions">

                        <div className="jobs_filter">
                            <input type="text" placeholder={t('jobs.search')} />
                            <select>
                                <option value="">{t('jobs.all')}</option>
                                <option value="">{t('jobs.open')}</option>
                                <option value="">{t('jobs.closed')}</option>
                            </select>
                        </div>
                        <div className="jobs_pagination">
                            <Pagination current={page} total={jobs.length} onChange={(page) => setPage(page)} />
                        </div>
                    </div>
                    <div className="jobs_list">
                        {jobsTemplate.map((job) => (
                            <JobListItem job={job} key={job.id} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};