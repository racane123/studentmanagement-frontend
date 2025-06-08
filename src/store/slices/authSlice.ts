import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const isTokenValid = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

const getUserFromToken = (token: string): User | null => {
  try {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email
    };
  } catch {
    return null;
  }
};

const getStoredToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  if (!isTokenValid(token)) {
    localStorage.removeItem('token');
    return null;
  }
  
  return token;
};

const initialState: AuthState = {
  user: null,
  token: getStoredToken(),
  loading: false,
  error: null,
  isAuthenticated: !!getStoredToken(),
};

// Initialize user from token if it exists
if (initialState.token) {
  initialState.user = getUserFromToken(initialState.token);
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await authAPI.login(credentials.email, credentials.password);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { name: string; email: string; password: string }) => {
    const response = await authAPI.register(userData.name, userData.email, userData.password);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuth: (state) => {
      const token = getStoredToken();
      if (!token) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      } else {
        state.token = token;
        state.user = getUserFromToken(token);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = getUserFromToken(action.payload.token);
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = getUserFromToken(action.payload.token);
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, checkAuth } = authSlice.actions;
export default authSlice.reducer; 