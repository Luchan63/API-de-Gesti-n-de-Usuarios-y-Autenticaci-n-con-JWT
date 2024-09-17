import { createSlice } from "@reduxjs/toolkit";

export const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialLogin,
    isLoginLoading: false,

    reducers: {

        onLogin: (state, { payload }) => {
            state.isAuth = true;
            state.isAdmin = payload.isAdmin,
                state.user = payload.user;
                state.isLoginLoading = false;
        },

        onLogout: (state) => {
            state.isAdmin = false;
            state.user = undefined;
            state.isAuth = false;
            state.isLoginLoading = false;
        },

        onIntLogin: (state) => {
            state.isLoginLoading = true;
        }
    }
});

export const { onLogin, onLogout, onIntLogin } = authSlice.actions;