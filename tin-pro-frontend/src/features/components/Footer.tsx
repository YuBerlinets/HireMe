import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "../../app/configs/i18n";

export default function Footer() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <footer className="footer">
            <div className="footer_content">

                <div className="footer_nav">
                    <a onClick={() => navigate("#")}>{t('footer.privacyPolicy')}</a>
                    <a onClick={() => navigate("#")}>{t('footer.termsOfService')}</a>
                    <a onClick={() => navigate("#")}>{t('footer.contactUs')}</a>
                </div>
                <div className="footer_language_switch">
                    <p >{t('footer.language')}</p>
                    <button onClick={() => changeLanguage("en")}>EN</button>
                    <button onClick={() => changeLanguage("uk")}>UA</button>

                </div>
            </div>
            <p className="footer_bottom">HireMe {new Date().getFullYear()}</p>
        </footer>
    )
}