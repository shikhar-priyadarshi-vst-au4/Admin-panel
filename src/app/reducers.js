import { combineReducers } from "redux";
import { loginSlice } from '../modules/Login/login.slice';
import { panelSlice } from '../modules/Panel/panel.slice';
import { userSlice } from '../modules/UserInfo/user.info.slice';

export default combineReducers({
    login: loginSlice.reducer,
    panel: panelSlice.reducer,
    user: userSlice.reducer,
})