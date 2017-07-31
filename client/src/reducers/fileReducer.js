import createReducer from "./createReducer";
import * as ActionTypes from '../constants/actionTypes';

const initState = {
    addedFiles: {},
    uploadedFiles: {}
}

export const fileReducer = createReducer(initState, {
    [ActionTypes.ADD_FILE] (state, action) {
        return {...state, addedFiles: {...state.addedFiles, [action.payload.fileCategory]: action.payload.file }}
    },
    [ActionTypes.UPLOAD_FILE_SUCCESS] (state, action) {
        return {...state, addedFiles: {}, uploadedFiles: { ...action.payload.fileObjects } }
    }

//   [ActionTypes.UPLOAD_FILE_SUCCESS](state, action) {
//     return {...state, files: {...state.files, action.payload.} }
//   },
//   [ActionTypes.LOGIN_REQUEST_FAILED](state, action) {
//     return {...state, message: action.payload.message}
//   },
//   [ActionTypes.LOGOUT_SUCCESS](statem, action) {
//     return {
//       loggedIn: false,
//       username: "",
//       message: "",
//       token: ""
//     }
//   }
});