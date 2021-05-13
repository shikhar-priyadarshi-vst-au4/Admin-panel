import { createSlice } from "@reduxjs/toolkit";
import { logIn } from './services';
import SecureLS from "secure-ls";

const ls = new SecureLS();
export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        error: null,
        isAuthenticated: (!!ls.get("token") && !!ls.get("loggedInUser")) || false,
        loggedInUser: !!ls.get("loggedInUser") || null,
        logoutResp: null,
        TokenResp: {},
        getExpiryResp: {},
        success: null
    },
    reducers: {
        login: state => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginError: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logout: state => {
            state.loading = false;
            state.error = null;
        },
        logoutSuccess: state => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        },
        setAuthenticate: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { login, loginSuccess, loginError, logout, logoutSuccess, setAuthenticate } = loginSlice.actions;


export const handleLogin = payload => {
    return async dispatch => {
        try {
            dispatch(login());
            const response = await logIn(payload);
            console.log("response", response);
            const { data, success, errors, message } = response;
            if (success && data) {
                ls.set("token", data.jwt);
                // localStorage.setItem("token", data.jwt);
                if (data.jwt) {
                    dispatch(loginSuccess());
                } else {
                    dispatch(loginError("Not valid user"));
                }
            }
            else{
                dispatch(loginError("Invalid Creditenials"));
            }
            
            // } else {
            //     let error = errors && getFirstError(errors);
            //     error = error ? error : data?.message;
            //     dispatch(loginError(error));
            // }

        } catch (err) {
            console.log(err);
            // dispatch(loginError(err));
        }

    }
};


export const loginStatus = state => state.login;