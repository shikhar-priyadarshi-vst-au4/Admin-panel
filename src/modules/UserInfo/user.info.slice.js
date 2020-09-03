import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, getUserByEmail, getUserAccounts, updateUser } from './user.info.service';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        user: {},
        accounts: {},
        success: false,
    },
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getAccount: (state, action) => {
            state.accounts = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        }
    }
});

export const { getUsers, getUser, getAccount, setSuccess } = userSlice.actions;

export const GetUsers = () => {
    return async dispatch => {
        try {
            let response = await getAllUsers();
            console.log(response);
            if (response.status === 200 && response.success) {
                dispatch(getUsers(response.data));
            }
        }
        catch (error) {

        }
    }
}

export const GetUserById = (user_id) => {
    return async dispatch => {
        try {
            let response = await getUserById(user_id);
            console.log(response);
            if (response.status === 200 && response.success) {
                dispatch(getUser(response.data));
            }
        }
        catch (error) {

        }
    }
}

export const GetUserByEmail = (email) => {
    return async dispatch => {
        try {
            let response = await getUserByEmail(email);
            console.log(response);
            if (response.status === 200 && response.success) {
                dispatch(getUser(response.data));
            }
        }
        catch (error) {

        }
    }
}

export const GetUserAccounts = (user_id) => {
    return async dispatch => {
        try {
            let response = await getUserAccounts(user_id);
            console.log(response);
            if (response.status === 200 && response.success) {
                dispatch(getUser(response.data));
            }
        }
        catch (error) {

        }
    }
}

export const UpdateUser = (user_id, data) => {
    return async dispatch => {
        dispatch(setSuccess(false));
        try {
            let response = await updateUser(user_id, data);
            console.log(response);
            if (response.status === 200 && response.success) {
                dispatch(setSuccess(true));
            }
        }
        catch (error) {

        }
    }
}


