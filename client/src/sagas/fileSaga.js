import { put, call } from 'redux-saga/effects';
import { upload } from "../apis";
import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILED } from "../constants/actionTypes"

export function* uploadFiles (uploadAction) {
    try {
        const response = yield call(upload, uploadAction.payload.fileObj)
        console.log("response", response);
        yield put({ type: UPLOAD_FILE_SUCCESS, payload: { message: "succeed"} });
    } catch(e) {
        console.log("error: ", e)
        yield put({ type: UPLOAD_FILE_FAILED, payload: { message: "unable to upload file" }})
    }
}