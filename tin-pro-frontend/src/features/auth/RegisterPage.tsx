import { Input, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useRegisterForm } from "./hooks/RegisterForm";


export default function RegisterPage() {
    const { registerData, successMessage, errorMessage, handleInputChange, isRecruiter, setIsRecruiter, handleSubmit } = useRegisterForm();
    const { t } = useTranslation();

    const onSwitchChange = (checked: boolean) => {
        setIsRecruiter(checked);
    };

    return (
        <>
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className="auth_form" noValidate>

                    <div className="acc_type">
                        <span>{t('auth.candidate')}</span>
                        <Switch value={isRecruiter} onChange={onSwitchChange} className="acc_type_switch" />
                        <span>{t('auth.recruiter')}</span>
                    </div>

                    <div className="auth_content_item">
                        <span>{t('auth.email')}</span>
                        <Input
                            name="email"
                            placeholder={t('auth.example.email')}
                            onChange={handleInputChange}
                            value={registerData.email}
                        />
                    </div>

                    <div className="auth_content_item">
                        <span>{t('auth.firstName')}</span>
                        <Input
                            name="firstName"
                            placeholder={t('auth.example.firstName')}
                            onChange={handleInputChange}
                            value={registerData.firstName}
                        />
                    </div>

                    <div className="auth_content_item">
                        <span>{t('auth.lastName')}</span>
                        <Input
                            name="lastName"
                            placeholder={t('auth.example.lastName')}
                            onChange={handleInputChange}
                            value={registerData.lastName}
                        />
                    </div>

                    <div className="auth_content_item">
                        <span>{t('auth.password')}</span>
                        <Input.Password
                            name="password"
                            placeholder={t('auth.example.password')}
                            onChange={handleInputChange}
                            value={registerData.password}
                        />
                    </div>

                    <button type="submit" className="submit_button">{t('buttons.submit')}</button>
                </form>
            </div>

        </>
    )
};