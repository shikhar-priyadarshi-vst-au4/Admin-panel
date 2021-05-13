import { combineReducers } from "redux";
import {userSlice} from '../pages/Users/slice';
import {loginSlice} from '../pages/Login/slice';

export default combineReducers({
    users : userSlice.reducer,
    login : loginSlice.reducer,
})
