import { createSlice } from "@reduxjs/toolkit";

export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const usersSlice = createSlice(
    {
        name: 'users',
        initialState: {
            users: [],
            usersSelected: initialUserForm,
            visibleForm: false,
            userError: initialErrors,
            isLoading: true,
        },

        reducers: {
            addUsers: (state, action) => {
                state.users = [
                    ...state.users,

                    {
                        ...action.payload,
                    }
                ];

                state.usersSelected = initialUserForm;
                state.visibleForm = false;
            },

            updateUsers: (state, action) => {
                state.users.map(u => {
                    if (u.id === action.payload.id) {
                        return {
                            ...action.payload,
                            password: u.password,
                        }
                    }
                    return u;
                });
                state.usersSelected = initialUserForm;
                state.visibleForm = false;
            },

            deleteUsers: (state, action) => {
                state, users = state.users.filter(user => user.id !== action.payload);
            },

            loadingUsers: (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
            },

            onUsersSelectedForm: (state, action) => {
                state.usersSelected = action.payload;
                state.visibleForm = true;
            },

            onOpenForm: (state) => {
                state.visibleForm = true;
            },

            onCloseForm: (state) => {
                state.visibleForm = false;
                state.usersSelected = initialUserForm;
            },

            onLoadingError: (state, {payload}) => {
                state.userError = payload;
            },
        }
    });

    export const {
        addUsers,
        updateUsers,
        deleteUsers,
        loadingUsers,
        onUsersSelectedForm,
        onOpenForm,
        onCloseForm,
        onLoadingError
    } = usersSlice.actions;

  
    
    
    