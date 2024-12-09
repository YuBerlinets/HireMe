import axios, { AxiosInstance } from 'axios';
import { RegisterData } from '../../features/auth/hooks/RegisterForm';

const baseURL = import.meta.env.VITE_BASE_URL;

const apiInstance: AxiosInstance = axios.create({
    baseURL,
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const isRefreshEndpoint = config.url?.includes('/api/users/refresh-token');

        if (token && !isRefreshEndpoint) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (isRefreshEndpoint) {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const api = {
    user: {
        getUserInfo: () => apiInstance.get('/api/users/my-information'),
        candidateRegister: (candidateRegister: RegisterData) => apiInstance.post('/api/auth/candidate/register', candidateRegister),
        recruiterRegister: (candidateRegister: RegisterData) => apiInstance.post('/api/auth/recruiter/register', candidateRegister),
        authenticate: (login: string, password: string) => apiInstance.post('/api/auth/login', { login, password }),
        refreshToken: (refreshToken: string) => apiInstance.post('/api/users/refresh-token', { refreshToken }),
        updateCandidateInfo: (data: any) => apiInstance.patch('/api/candidates', data),
    },
    candidate: {
        uploadCV: (data: FormData) => apiInstance.post('/api/candidates/upload-cv', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }),
        deleteCV: () => apiInstance.delete('/api/candidates/cv'),
    },
    admin: {

    }
};

export const setAuthToken = (token: string | null) => {
    if (token) {
        apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete apiInstance.defaults.headers.common["Authorization"];
    }
}

const storedToken = localStorage.getItem('token');
setAuthToken(storedToken);

export { api };

export { baseURL };