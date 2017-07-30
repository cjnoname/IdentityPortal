import createReducer from "./createReducer";
import * as ActionTypes from '../constants/actionTypes';

const initState = {
    loggedIn: false,
    username: "",
    token: "",
    message: ""
}

export const authReducer = createReducer(initState, {
  [ActionTypes.LOGIN_REQUEST_SUCCESS](state, action) {
    return {...state, loggedIn: true, username: action.payload.username, token: action.payload.token}
  },
  [ActionTypes.LOGIN_REQUEST_FAILED](state, action) {
    return {...state, message: action.payload.message}
  }
});