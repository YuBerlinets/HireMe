import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../app/api/ApiConfig';


interface User {
    email: string
    firstName: string
    lastName: string
    role: string
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
};

export const login = createAsyncThunk(
    'auth/login',
    async (loginData: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.user.authenticate(loginData.username.trim(), loginData.password);
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
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('refreshToken');
            window.location.reload();
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
                localStorage.setItem('user', user);
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })

    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
