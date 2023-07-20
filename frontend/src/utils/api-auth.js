export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponseStatus(response, errorText) {
    if (response.status === 400 || response.status === 401) {
        return Promise.reject(`${errorText}: ${response.status}`)
    }
    return response.json()
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            return checkResponseStatus(response, 'Ошибка регистрации')
        })
};
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            return checkResponseStatus(response, 'Ошибка авторизации')
        })
};
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        return checkResponseStatus(response, 'Ошибка проверки токена')
    })
}