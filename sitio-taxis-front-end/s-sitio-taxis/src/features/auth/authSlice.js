import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated: false,
      user: null,
      token: localStorage.getItem('token') || null,
      error: null,
    },
    reducers: {
      loginStart: (state) => {
        state.error = null;
      },
      loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
  
        // Almacena el token en localStorage
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', action.payload.user);
      },
      loginFailure: (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
  
        // Elimina el token de localStorage al cerrar sesión
        localStorage.removeItem('token');
      },
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
  export default authSlice.reducer;