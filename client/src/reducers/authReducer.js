import createReducer from "./createReducer";
import * as ActionTypes from '../constants/actionTypes';

const initState = {
    loggedIn: false,
    username: "",
    token: localStorage.getItem('token'),
    message: ""
}

export const authReducer = createReducer(initState, {
  [ActionTypes.LOGIN_REQUEST_SUCCESS](state, action) {
    return {...state, loggedIn: true, username: action.payload.username, token: action.payload.token, message: "" }
  },
  [ActionTypes.LOGIN_REQUEST_FAILED](state, action) {
    return {...state, message: action.payload.message}
  },
  [ActionTypes.LOGOUT_SUCCESS](statem, action) {
    return {
      loggedIn: false,
      username: "",
      message: "",
      token: ""
    }
  }
});