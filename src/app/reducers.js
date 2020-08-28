import { combineReducers } from "redux";
import { loginSlice } from '../modules/Login/login.slice';
import { panelSlice } from '../modules/Panel/panel.slice';

export default combineReducers({
    login: loginSlice.reducer,
    panel: panelSlice.reducer
})