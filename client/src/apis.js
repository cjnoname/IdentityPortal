import axios from "axios";
import { getAuthToken } from "./utils/auth";

export const login = function (username, password) {
    return axios.post("http://localhost:64338/Umbraco/Api/Auth/Login",{
        Username: username,
        Password: password
    });
}

// export const logout = function () {
//     return new Promise (function(resolve, reject) {
//       resolve()
//     });
// }

export const autoLogin = function (token) {
    return axios.post("http://localhost:64338/Umbraco/Api/Auth/ValidateToken", { token });
}

export const upload = function (files) {
    const formData = new FormData();
    Object.keys(files).forEach(fileName => {
        formData.append(fileName, files[fileName]);
    });

    // var config = {
    //     onUploadProgress: function(progressEvent) {
    //         var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    //     }
    // };

    return axios.post('http://localhost:64338/Umbraco/Api/Document/Upload', formData, {
        headers: { AuthToken: getAuthToken() }
    });
}

export const loadFiles = function () {
    return axios.get('http://localhost:64338/Umbraco/Api/Document/Documents', {
        headers: { AuthToken: getAuthToken() }
    });
}

export const removeFile = function (id) {
    return axios.delete(`http://localhost:64338/Umbraco/Api/Document/Documents/${id}`, {
        headers: { AuthToken: getAuthToken() }
    });
}