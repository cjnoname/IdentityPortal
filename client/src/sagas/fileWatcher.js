import { takeLatest } from 'redux-saga';
import { put, call, take, select, fork } from 'redux-saga/effects';
import { uploadFiles, loadAllFiles, deleteFile } from './fileSaga';
import * as types from '../constants/actionTypes';

export function* watchFileUpload () {
    yield* takeLatest(types.UPLOAD_FILE_REQUEST, uploadFiles);
}

export function* watchLoadFiles () {
    yield* takeLatest(types.LOAD_FILE_REQUEST, loadAllFiles);
}

export function* watchRemoveFiles () {
    yield* takeLatest(types.REMOVE_FILE_REQUEST, deleteFile);
}