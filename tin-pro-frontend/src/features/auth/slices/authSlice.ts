import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../app/api/ApiConfig';
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
}

const getStoredAuthState = (): Partial<AuthState> => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    return {
        user: user ? JSON.parse(user) : null,
        token: token || null,
        isAuthenticated: !!token,
    };
};

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    ...getStoredAuthState(),
};

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: { login: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.user.authenticate(
                loginData.login.trim(),
                loginData.password
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data.message || 'An unexpected error occurred');
        }
    }
);

// export const resetPassword = createAsyncThunk(
//     'auth/resetPassword',
//     async (resetData: { email: string }, { rejectWithValue }) => {
//         try {
//             const response = await api.user.resetPassword(resetData.email);
//             return response.data;
//         } catch (error: any) {
//             const statusCode = error.response?.status;
//             return rejectWithValue(statusCode || 'Failed to reset password');
//         }
//     }
// );


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/login';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const { user, token } = action.payload;
                state.user = user;
                state.token = token;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
