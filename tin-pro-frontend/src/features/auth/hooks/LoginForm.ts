import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '../slices/authSlice';
import { useAppDispatch } from '../../../app/store/store';

interface LoginData {
    login: string;
    password: string;
}

interface UseLoginFormReturn {
    loginData: LoginData;
    loginError: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
    const [loginData, setLoginData] = useState<LoginData>({
        login: '',
        password: ''
    });
    const [loginError, setLoginError] = useState<string>('');

    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setLoginError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (loginData.login === '' || loginData.password === '') {
            setLoginError(t('login.error.empty'));
            return;
        }

        try {
            const result = await dispatch(login(loginData)).unwrap();
            if (result.user) {
                navigate('/');
            }
        } catch (error) {
            setLoginError(t('login.error.invalid'));
        }
    };


    return {
        loginData,
        loginError,
        handleInputChange,
        handleSubmit,
    };
};
