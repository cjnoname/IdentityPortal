import { put, call } from 'redux-saga/effects';
import { login, logout, autoLogin } from "../apis";
import { saveAuthToken, removeAuthToken, hasAuthToken, getAuthToken } from "../utils/auth";
import { push } from 'react-router-redux';
import * as types from '../constants/actionTypes';

export function* authorize (loginAction) {
    try {
        const response = yield call(login, loginAction.payload.username, loginAction.payload.password);
        const username = response.data.CurrenUserName;
        const token = response.data.AuthToken;
        if (!username || !token) {
            yield put({ type: types.LOGIN_REQUEST_FAILED, payload: {message: "Inccorect username or password"} })
        } else {
            yield put({type: types.LOGIN_REQUEST_SUCCESS, payload: { username, token }});
            saveAuthToken(token);
            yield put(push('/Welcome'));
        }
    } catch (error) {
        yield put({ type: types.LOGIN_REQUEST_FAILED, payload: { message: "unexpected error occured" } });
    }
}

export function* deauthorize (logoutAction) {
    removeAuthToken();
    yield put({type: types.LOGOUT_SUCCESS});
    yield put(push('/Login'));
}

export function* autoAuthorize (autoLoginAction) {
    try {
        const token = getAuthToken();
        if (!hasAuthToken()) {
            yield put({ type: types.LOGIN_REQUEST_FAILED, payload: { message: "user not found" }});
        } else {
            const response = yield call(autoLogin, getAuthToken());
            const username = response.data.CurrenUserName;
            const token = response.data.AuthToken;
            if (!username || !token) {
                yield put({ type: types.LOGIN_REQUEST_FAILED, payload: {message: "Inccorect username or password"} })
            } else {
                yield put({type: types.LOGIN_REQUEST_SUCCESS, payload: { username, token }});
                saveAuthToken(token);
                yield put(push('/Welcome'));
            }
        }
    } catch (e) {
        yield put({ type: types.LOGIN_REQUEST_FAILED, payload: { message: "unexpected error occured" }});
    }
}