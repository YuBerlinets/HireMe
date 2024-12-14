import axios, { AxiosInstance } from 'axios';
import { RegisterData } from '../../features/auth/hooks/RegisterForm';
import { useNavigate } from 'react-router-dom';


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

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            window.location.href = '/login';
        }
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
    },

    candidate: {
        uploadCV: (data: FormData) => apiInstance.post('/api/candidates/cv', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }),
        deleteCV: () => apiInstance.delete('/api/candidates/cv'),
        getCandidates: (page: number, size: number) => apiInstance.get('/api/candidates/p', { params: { page, size } }),
        getCandidateInformation: (id: string) => apiInstance.get(`/api/candidates/p/${id}`),
        updateCandidateInfo: (data: any) => apiInstance.patch('/api/candidates', data),

    },
    job: {
        getJobs: (page: number, size: number) => apiInstance.get('/api/jobs', { params: { page, size } }),
        getJobById: (id: string) => apiInstance.get(`/api/jobs/${id}`),
        getJobCreatedByRecruiter: (recruiterId: number) => apiInstance.get(`/api/jobs/by-recruiter/${recruiterId}`),
        assignCandidateToJob: (jobId: number, candidateId: number) => apiInstance.post(`/api/jobs/${jobId}/assign-candidate/${candidateId}`),
    },
    recruiter: {
        postedJobs: () => apiInstance.get('/api/jobs/posted'),
        assignedCandidatesJobs: () => apiInstance.get('/api/recruiters/assigned-jobs'),
        unassignCandidateFromJob: (jobCandidateId: number) => apiInstance.delete(`/api/job-candidates/${jobCandidateId}`),
        changeJobCandidateStatus: (jobCandidateId: number, status: string) => apiInstance.patch(`/api/job-candidates/${jobCandidateId}`, { status }),
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