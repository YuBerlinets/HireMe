import { Input } from "antd";
import { useTranslation } from "react-i18next";
import { useLoginForm } from "./hooks/LoginForm";


export default function LoginPage() {
    const { loginData, loginError, handleInputChange, handleSubmit } = useLoginForm();
    const { t } = useTranslation();

    return (
        <>
            <div className="container">
                <h1 className="auth_title">{t('header.login')}</h1>
                <form onSubmit={handleSubmit} className="auth_form" noValidate>

                    <div className="auth_content_item">
                        <span>{t('auth.email')}</span>
                        <Input
                            name="login"
                            placeholder={t('auth.example.email')}
                            onChange={handleInputChange}
                            value={loginData.login}
                        />
                    </div>

                    <div className="auth_content_item">
                        <span>{t('auth.password')}</span>
                        <Input.Password
                            name="password"
                            placeholder={t('auth.example.password')}
                            onChange={handleInputChange}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className="submit_button">{t('buttons.submit')}</button>
                </form>
                {loginError && <div className="error_message">{loginError}</div>}
            </div>

        </>
    )
};