import { useTranslation } from "react-i18next";

interface ErrorProps {
    status?: string;
    message?: string;
}

export default function Error({
    status,
    message
}: ErrorProps) {
    const { t } = useTranslation();
    status = status || t('errorPage.404.status');
    message = message || t('errorPage.404.message');
    return (
        <div className="error">
            <h1 className="error_status">{status}</h1>
            <p className="error_message">{message}</p>
            <a href="/" className="error_button">{t('errorPage.return')}</a>
        </div>
    );
}
