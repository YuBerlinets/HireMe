import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import MainPage from "../../features/mainpage/MainPage";
import Error from "../../features/errors/Error";
import LoginPage from "../../features/auth/LoginPage";
import RegisterPage from "../../features/auth/RegisterPage";

// const token = localStorage.getItem('token');

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ],
    },
    {
        path: '*',
        element: <Error />,
    },
]);

export { router };
