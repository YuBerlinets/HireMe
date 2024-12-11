import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../app/api/ApiConfig";
import JobListItem from "./components/JobListItem";
import Footer from "../components/Footer";
import { Pagination, Skeleton } from "antd";

export interface JobItem {
    id: number;
    title: string;
    location: string;
    company: string;
    date: string;
    status: string;
}
interface JobPagination {
    jobs: JobItem[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}


export default function JobsPage() {
    const { t } = useTranslation();
    const [jobsPagination, setJobPagination] = useState<JobPagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const pageSize = 10;

    const fetchJobs = async (page = 1, size = 10) => {
        try {
            const response = await api.job.getJobs(page - 1, size);
            if (response.status === 200) {
                const data = response.data;
                setJobPagination(data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };

    useEffect(() => {
        fetchJobs(currentPage, pageSize);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={jobsPagination?.totalElements || 0}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                    <div className="jobs_list">
                        {isLoading && !jobsPagination?.jobs && (
                            Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    paragraph={{ rows: 0 }}
                                    active
                                    className="list_skeleton"
                                />
                            ))
                        )}
                        {jobsPagination?.jobs.map((job) => (
                            <JobListItem job={job} key={job.id} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};