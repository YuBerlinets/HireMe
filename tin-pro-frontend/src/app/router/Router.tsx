import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layouts/App";
import MainPage from "../../features/candidate/Candidates";
import Error from "../../features/errors/Error";
import LoginPage from "../../features/auth/LoginPage";
import RegisterPage from "../../features/auth/RegisterPage";
import CandidatePage from "../../features/candidate/CandidatePage";
import AccountPage from "../../features/user/AccountPage";
import Candidates from "../../features/candidate/Candidates";
import JobsPage from "../../features/job/JobsPage";
import JobPage from "../../features/job/JobPage";

// const token = localStorage.getItem('token');

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Navigate to="/candidates" />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: '/jobs',
                element: <JobsPage />,
            },
            {
                path: '/jobs/:jobId',
                element: <JobPage />,
            },
            {
                path: "/candidates",
                element: <Candidates />
            },
            {
                path: '/candidates/:candidateId',
                element: <CandidatePage />,
            },
            {
                path: '/profile',
                element: <AccountPage />,
            }
        ],
    },
    {
        path: '*',
        element: <Error />,
    },
]);

export { router };
