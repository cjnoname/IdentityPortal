import { put, call } from 'redux-saga/effects';
import { upload, loadFiles, removeFile } from "../apis";
import { 
    UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILED, LOAD_FILE_SUCCESS,
    LOAD_FILE_FAILED, REMOVE_FILE_SUCCESS, REMOVE_FILE_FAILED
} from "../constants/actionTypes";

export function* uploadFiles (uploadAction) {
    try {
        const response = yield call(upload, uploadAction.payload.fileObj)
        yield put({ type: UPLOAD_FILE_SUCCESS, payload: { message: "succeed"} });
    } catch(e) {
        yield put({ type: UPLOAD_FILE_FAILED, payload: { message: "unable to upload file" }})
    }
}

export function* loadAllFiles () {
    try {
        const response = yield call(loadFiles);
        yield put({ type: LOAD_FILE_SUCCESS, payload: { uploadedFiles: response.data}});
    } catch(e) {
        yield put({ type: LOAD_FILE_FAILED, payload: { message: "unable to load files" }});
    }
}

export function* deleteFile (removeAction) {
    try {
        const id = removeAction.payload.id;
        const response = yield call(removeFile, id);
        yield put({ type: REMOVE_FILE_SUCCESS, payload: { id }});
    } catch(e) {
        yield put({ type: REMOVE_FILE_FAILED, payload: { message: "unable to remove files" }});
    }
}