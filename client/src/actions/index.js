import { LOGIN_REQUEST, LOGOUT, AUTO_LOGIN_REQUEST } from "../constants/actionTypes";

export const loginRequestAct = (username, password) => ({ type: LOGIN_REQUEST, payload: { username, password }});

export const logoutAct = () => ({ type: LOGOUT });

export const autoLoginAct = () => ({ type: AUTO_LOGIN_REQUEST });