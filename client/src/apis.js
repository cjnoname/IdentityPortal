import axios from "axios";

export const login = function (username, password) {
    console.log("login api called ", username, password);
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

    return  axios.post('http://localhost:64338/Umbraco/Api/Document/Upload', formData);
}