export const login = function (username, password) {
    return new Promise (function(resolve, reject) {
      setTimeout(function() {
        resolve({token: "abc123"});
      }, 500);
    });
}

export const logout = function () {
    return new Promise (function(resolve, reject) {
      resolve()
    });
}