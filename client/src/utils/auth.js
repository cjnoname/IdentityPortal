export function saveAuthToken (token) {
    localStorage.setItem("token", token);
}

export function removeAuthToken () {
    localStorage.removeItem("token");
}

export function hasAuthToken () {
    return !!localStorage.getItem("token");
}

export function getAuthToken () {
    return localStorage.getItem("token");
}