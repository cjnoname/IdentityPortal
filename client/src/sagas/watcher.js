import { takeLatest } from 'redux-saga';
import { put, call, take, select, fork } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import * as types from '../constants/actionTypes';
import { login, logout } from "../apis";

export default function* watchAuth() {
     while(true) {
        const loginAction = yield take(types.LOGIN_REQUEST);
        const response = call(login, loginAction.payload.username, loginAction.payload.password)
        yield put({type: "LOGIN_SUCCESS", payload: loginAction.payload.token})
        yield take("LOGOUT");
        yield put({type: "LOGOUT_SUCCESS"})
    }
}