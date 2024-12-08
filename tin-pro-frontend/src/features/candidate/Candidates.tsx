import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

import "../../assets/styles/style.css";
import CandidateItem from "./components/CandidateItem";
import { useState } from "react";

export default function Candidates() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const candidates = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            yearsOfExperience: 3,
            desiredPosition: "Frontend Developer",
            desiredSalary: "1000$ - 2000$"
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            yearsOfExperience: 5,
            desiredPosition: "Backend Developer",
            desiredSalary: "2000$"
        },
        {
            id: 3,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 4,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 5,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 6,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 7,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 8,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 9,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        }, {
            id: 10,
            firstName: "John",
            lastName: "Smith",
            yearsOfExperience: 7,
            desiredPosition: "Fullstack Developer",
            desiredSalary: "2000$"
        },
    ];
    const [filters, setFilters] = useState({
        byExperience: false,
        byPosition: false,
        bySalary: false
    });

    const handleFilter = (filter: keyof typeof filters) => {
        setFilters({ ...filters, [filter]: !filters[filter] });
    }

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
                        <button className="pagination_button">
                            {t('mainPage.pagination.previous')}
                        </button>
                        <button className="pagination_button">
                            {t('mainPage.pagination.next')}
                        </button>
                    </div>
                </div>
                <div className="candidates_list">
                    {candidates.map(candidate => (
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
    )
}