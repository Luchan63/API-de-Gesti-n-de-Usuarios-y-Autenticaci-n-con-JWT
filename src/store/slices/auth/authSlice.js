import { createSlice } from "@reduxjs/toolkit";

export const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialLogin,

    reducers: {

        onLogin: (state, { payload }) => {
            state.isAuth = true;
            state.isAdmin = payload.isAdmin,
                state.user = payload.user;
        },

        onLogout: (state) => {
            state.isAdmin = false;
            state.user = undefined;
            state.isAuth = false;
        }
    }
});

export const { onLogin, onLogout } = authSlice.actions;