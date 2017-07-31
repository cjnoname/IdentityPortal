import createReducer from "./createReducer";
import * as ActionTypes from '../constants/actionTypes';

const initState = {
    addedFiles: {},
    uploadedFiles: [],
    message: ""
}

export const fileReducer = createReducer(initState, {
    [ActionTypes.ADD_FILE] (state, action) {
        return {...state, addedFiles: {...state.addedFiles, [action.payload.fileCategory]: action.payload.file }};
    },
    [ActionTypes.UPLOAD_FILE_SUCCESS] (state, action) {
        return {...state, addedFiles: {}, message: action.payload.message };
    },
    [ActionTypes.LOAD_FILE_SUCCESS] (state, action) {
        return { ...state, uploadedFiles: action.payload.uploadedFiles };
    },
    [ActionTypes.REMOVE_FILE_SUCCESS] (state, action) {
        return { ...state, uploadedFiles: state.uploadedFiles.filter(file => file.Id !== action.payload.id)};
    },
    [ActionTypes.REMOVE_FILE_FAILED] (state, action) {
        return { ...state, message: action.payload.message };
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