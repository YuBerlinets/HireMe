import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

import "../../assets/styles/style.css";
import CandidateItem from "./components/CandidateItem";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { api } from "../../app/api/ApiConfig";

interface CandidatesPagination {
    candidates: CandidateItem[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}

interface CandidateItem {
    id: number;
    firstName: string;
    lastName: string;
    yearsOfExperience: number;
    desiredPosition: string;
    desiredSalary: string;
}

export default function Candidates() {
    const [candidates, setCandidates] = useState<CandidatesPagination | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const fetchCandidates = async (page = 1, size = 10) => {
        try {
            const response = await api.candidate.getCandidates(page - 1, size);
            const data = response.data;
            setCandidates(data);
        } catch (error) {
            console.error("Error fetching candidates", error);
        }
    };

    useEffect(() => {
        fetchCandidates(currentPage, pageSize);
    }, [currentPage]);

    const [filters, setFilters] = useState({
        byExperience: false,
        byPosition: false,
        bySalary: false,
    });

    const handleFilter = (filter: keyof typeof filters) => {
        setFilters({ ...filters, [filter]: !filters[filter] });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="container">
                <h1>{t('mainPage.title')}</h1>
                <p>{t('mainPage.description')}</p>
                <div className="candidates_actions">
                    <div className="candidates_filters">
                        <span>{t('mainPage.filters.title')}</span>
                        <button
                            className={`action_button filter ${filters.byExperience ? 'active' : ''}`}
                            onClick={() => handleFilter('byExperience')}
                        >
                            {t('mainPage.filters.byExperience')}
                        </button>
                        <button
                            className={`action_button filter ${filters.byPosition ? 'active' : ''}`}
                            onClick={() => handleFilter('byPosition')}
                        >
                            {t('mainPage.filters.byPosition')}
                        </button>
                        <button
                            className={`action_button filter ${filters.bySalary ? 'active' : ''}`}
                            onClick={() => handleFilter('bySalary')}
                        >
                            {t('mainPage.filters.bySalary')}
                        </button>
                    </div>
                    <div className="candidates_pagination">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={candidates?.totalElements || 0}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
                <div className="candidates_list">
                    {candidates?.candidates.map((candidate) => (
                        <CandidateItem
                            key={candidate.id}
                            firstName={candidate.firstName}
                            lastName={candidate.lastName}
                            yearsOfExperience={candidate.yearsOfExperience}
                            desiredPosition={candidate.desiredPosition}
                            desiredSalary={candidate.desiredSalary}
                            onClick={() => navigate(`/candidates/${candidate.id}`)}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}
