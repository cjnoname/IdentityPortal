import { takeLatest } from 'redux-saga';
import { put, call, take, select, fork } from 'redux-saga/effects';
import { authorize, deauthorize, autoAuthorize, registerUser } from './authSaga';
import * as types from '../constants/actionTypes';
import { login, logout } from "../apis";
import { saveAuthToken, removeAuthToken } from "../utils/auth";

export function* watchAuth() {
     yield* takeLatest(types.LOGIN_REQUEST, authorize);
}

export function* watchDeAuth() {
    yield* takeLatest(types.LOGOUT, deauthorize);
}

export function* autoAuth() {
    yield* takeLatest(types.AUTO_LOGIN_REQUEST, autoAuthorize)
}

export function* watchRegister() {
    yield* takeLatest(types.REGISTER_REQUEST, registerUser)
}