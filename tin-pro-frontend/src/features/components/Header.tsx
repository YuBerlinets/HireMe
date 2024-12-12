import { useNavigate } from "react-router-dom";
import "../../assets/styles/style.css";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { logout } from "../auth/slices/authSlice";
import { Avatar } from "antd";

export default function Header() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
    const user = useAppSelector((state) => state.auth.user);
    useEffect(() => {
        if (isLoggedIn) {
            setIsUserLoggedIn(true);
        }
    }, [isLoggedIn]);


    return (
        <header className="header">
            <nav className="header_navbar">
                <h1 onClick={() => navigate("/")} className="header_item header_logo">
                    <a>HireMe</a>
                </h1>
                <ul>
                    {isUserLoggedIn && (
                        <>
                            <li onClick={() => navigate("/jobs")} className="header_item">
                                <a>{t('header.jobs')}</a>
                            </li>
                            <li onClick={() => navigate("/candidates")} className="header_item">
                                <a>{t('header.candidates')}</a>
                            </li>
                        </>
                    )}
                    {!isUserLoggedIn && (
                        <>
                            <li onClick={() => navigate("/register")} className="header_item">
                                <a>{t('header.register')}</a>
                            </li>
                            <li onClick={() => navigate("/login")} className="header_item">
                                <a>{t('header.login')}</a>
                            </li>
                        </>
                    )}

                    {isUserLoggedIn && (
                        <div
                            className="account_managment_container"
                            onMouseEnter={() => setIsAccountMenuOpen(true)}
                            onMouseLeave={() => setIsAccountMenuOpen(false)}
                        >
                            <span className="header_logged_user">
                                {/* <VscAccount className="header_account_logo" /> */}
                                <Avatar
                                    className="header_account_logo"
                                    style={{ backgroundColor: "#87d068", verticalAlign: 'middle', fontSize: '22px' }}
                                    size="large"
                                >
                                    {user?.firstName.charAt(0).toUpperCase()}
                                </Avatar>
                                {isAccountMenuOpen && (
                                    <div className="header_account_menu">
                                        <ul className="header_account_menu_ul">
                                            <li onClick={() => navigate("/profile")}>
                                                <a>{t('header.profile')}</a>
                                            </li>
                                            <li onClick={() => dispatch(logout())}>
                                                <a>{t('header.logout')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </span>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    )
}