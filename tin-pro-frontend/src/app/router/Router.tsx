import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layouts/App";
import MainPage from "../../features/candidate/Candidates";
import Error from "../../features/errors/Error";
import LoginPage from "../../features/auth/LoginPage";
import RegisterPage from "../../features/auth/RegisterPage";
import CandidatePage from "../../features/candidate/CandidatePage";
import AccountPage from "../../features/user/AccountPage";
import Candidates from "../../features/candidate/Candidates";

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
                element: <div>Jobs</div>,
            },
            {
                path: "/candidates",
                element: <Candidates />
            },
            {
                path: '/candidates/:id',
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
