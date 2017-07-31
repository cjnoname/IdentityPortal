import {
    LOGIN_REQUEST, LOGOUT, AUTO_LOGIN_REQUEST,
    ADD_FILE, UPLOAD_FILE_REQUEST, UPLOAD_FILE_FAILED, LOAD_FILE_REQUEST,
    REMOVE_FILE_REQUEST, REGISTER_REQUEST
} from "../constants/actionTypes";

export const loginRequestAct = (username, password) => ({ type: LOGIN_REQUEST, payload: { username, password }});

export const logoutAct = () => ({ type: LOGOUT });

export const autoLoginAct = () => ({ type: AUTO_LOGIN_REQUEST });

export const addFileAct = (fileCategory, file) => ({ type: ADD_FILE, payload: { fileCategory, file } });

export const uploadFileAct = (fileObj) => ({ type: UPLOAD_FILE_REQUEST, payload: { fileObj } });

export const loadFilesAct = () => ({ type: LOAD_FILE_REQUEST });

export const removeFileAct = (id) => ({ type: REMOVE_FILE_REQUEST, payload: { id } });

export const registerRequestAct = (email, password, firstName, lastName, address, passport) => ({ type: REGISTER_REQUEST, payload: { userObject: {email, password, firstName, lastName, address, passport } }});
