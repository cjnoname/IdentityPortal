import { takeLatest } from 'redux-saga';
import { put, call, take, select, fork } from 'redux-saga/effects';
import { uploadFiles } from './fileSaga';
import * as types from '../constants/actionTypes';
import { login, logout } from "../apis";

export function* watchFileUpload () {
    yield* takeLatest(types.UPLOAD_FILE_REQUEST, uploadFiles)
}