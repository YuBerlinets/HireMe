import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { checkPasswordValidity, validateEmail } from '../helpers/AuthHelper';
import { api } from '../../../app/api/ApiConfig';
import { useAppDispatch } from '../../../app/store/store';
import { login } from '../slices/authSlice';



export interface RegisterData {
    email: string
    firstName: string
    lastName: string
    password: string
}

interface UseRegisterFormReturn {
    registerData: RegisterData;
    successMessage: string;
    errorMessage: string;
    isRecruiter: boolean;
    setIsRecruiter: (checked: boolean) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useRegisterForm = (): UseRegisterFormReturn => {
    const [isRecruiter, setIsRecruiter] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [registerData, setRegisterData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
            setErrorMessage(t('register.allFieldsRequired'));
            return;
        }

        if (registerData.password.length < 8) {
            setErrorMessage(t('register.invalidPasswordLength'));
            return;
        }

        if (!checkPasswordValidity(registerData.password)) {
            setErrorMessage(t('register.invalidPassword'));
            return;
        }

        if (!validateEmail(registerData.email)) {
            setErrorMessage(t('register.invalidEmail'));
            return;
        }

        console.log(registerData);
        console.log(isRecruiter);
        try {
            const response = isRecruiter ? await api.user.recruiterRegister(
                registerData
            ) : await api.user.candidateRegister(
                registerData
            );
            if (response.status === 200 && response.data.token !== null) {
                setSuccessMessage(response.data.message);
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 1000);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    return {
        registerData,
        successMessage,
        errorMessage,
        isRecruiter,
        setIsRecruiter,
        handleInputChange,
        handleSubmit
    };
};
