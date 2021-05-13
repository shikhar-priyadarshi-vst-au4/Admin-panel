import { createSlice } from "@reduxjs/toolkit";
import {
    getAllUsers, getUserById, getUserByEmail,
    getUserAccounts, updateUser, updateSpecificAccount,
    assignusertags
} from './services';

export const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        user: {},
        accounts: {},
        success: false,
        xpaginationnextUser: 0
    },
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        getUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = {};
        },
        getAccount: (state, action) => {
            state.accounts = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        setXPaginationNextUser: (state, action) => {
            state.xpaginationnextUser = action.payload;
        }
    }
});

export const { getUsers, getUser, clearUser, getAccount, setSuccess, setXPaginationNextUser } = userSlice.actions;

export const GetUsers = (next = 0) => {
    return async dispatch => {
        try {
            dispatch(clearUser());
            let response = await getAllUsers(next);
            response.data = response.data.map(v => {
                v.accounts = v?.accounts?.filter(val => val.type === "futures");
                return v;
            })
            if (response.status === 200 && response.success) {
                dispatch(setXPaginationNextUser(response.headers["x-pagination-cursor"] || 0));
                dispatch(getUsers(response.data));
            }
        }
        catch (error) {

        }
    }
}

export const GetAllUsers = () => {
    return async dispatch => {
        dispatch(clearUser());
        let result = [];
        let cursor = null;
        while (true) {
            let response = await getAllUsers(cursor ? cursor : 0);
            response.data = response.data?.map(v => {
                v.accounts = v?.accounts?.filter(val => val.type === "futures");
                return v;
            })
            cursor = response?.headers ? response?.headers["x-pagination-cursor"] : null;
            if (response?.status === 200 && response?.success) {
                result = [...result, ...response.data];
            }
            if (!cursor) {
                break;
            }
        }
        if (result.length > 0) {
            dispatch(getUsers(result));
        }
        else {
            dispatch(getUsers([]))
        }
    }
}

export const GetUserById = (user_id) => {
    return async dispatch => {
        try {
            dispatch(clearUser());
            let response = await getUserById(user_id);
            if (response.status === 200 && response.success && response.data.length > 0) {
                dispatch(getUser(response.data[0]));
            }
            else {
                dispatch(clearUser());
            }
        }
        catch (error) {

        }
    }
}

export const GetUserByEmail = (emails) => {
    return async dispatch => {
        try {
            dispatch(clearUser());
            let response = await getUserByEmail(emails);
            response.data = response.data.map(v => {
                return { ...v };
            })
            if (response.status === 200 && response.success && response.data.length > 0) {
                dispatch(getUser(response.data[0]));
            }
            else {
                dispatch(clearUser());
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
            if (response.status === 200 && response.success) {
                dispatch(GetUsers());
                dispatch(setSuccess(true))
            }
        }
        catch (error) {

        }
    }
}


export const UpdateRiskCheck = (account_id, data) => {
    return async dispatch => {
        try {
            let response = await updateSpecificAccount(account_id, data);
            if (response.status === 200 && response.success) {
                dispatch(GetUsers());
                dispatch(setSuccess(true));
            }
        }
        catch (error) {

        }
    }
}

export const AssignUserTags = (userId, tags) => {
    return async dispatch => {
        try {
            let response = await assignusertags(userId, {
                tags
            })
            console.log(response);
            if (response.status === 200 && response.success) {
                dispatch(GetUsers());
                dispatch(setSuccess(true));
            }
        }
        catch (error) {

        }
    }
}