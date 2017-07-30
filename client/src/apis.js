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