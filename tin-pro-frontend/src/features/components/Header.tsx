import { useNavigate } from "react-router-dom";
import "../../assets/styles/style.css";
import { useEffect, useState } from "react";
import { isUserAuthenticated } from "../auth/helpers/AuthHelper";
import { VscAccount } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

export default function Header() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        if (isUserAuthenticated()) {
            setIsUserLoggedIn(true);
        }
    }, []);


    return (
        <header className="header">
            <nav className="header_navbar">
                <h1 onClick={() => navigate("/")} className="header_item header_logo">
                    <a>TIN</a>
                </h1>
                <ul>
                    <li onClick={() => navigate("/")} className="header_item">
                        <a>{t('header.dashboard')}</a>
                    </li>
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
                                <VscAccount className="header_account_logo" />
                                {isAccountMenuOpen && (
                                    <div className="header_account_menu">
                                        <ul className="header_account_menu_ul">
                                            <li onClick={() => navigate("/profile")}>
                                                <a>{t('header.profile')}</a>
                                            </li>
                                            <li onClick={() => navigate("/logout")}>
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