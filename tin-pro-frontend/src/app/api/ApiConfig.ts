import axios, { AxiosInstance } from 'axios';

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
        getUserInfo: () => apiInstance.get('/api/users/basic-information'),
        register: (username: string, firstName: string, lastName: string, email: string, password: string, repeatPassword: string, preferredLanguage: string) => apiInstance.post('/api/users/register', { username, firstName, lastName, email, password, repeatPassword, preferredLanguage }),
        authenticate: (login: string, password: string) => apiInstance.post('/api/users/login', { login, password }),
        refreshToken: (refreshToken: string) => apiInstance.post('/api/users/refresh-token', { refreshToken }),
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