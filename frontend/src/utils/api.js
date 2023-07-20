class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponseStatus(response, errorText) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`${errorText}: ${response.status}`)
    }

    getUresInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка загрузки информации о пользователе')
            })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка получения карточек')
            })
    }

    getStartAppData() {
        return Promise.all([this.getUresInfo(), this.getInitialCards()])
    }

    setUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            body: JSON.stringify(userData),
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка изменения данных пользователя')
            })
    }

    addNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            body: JSON.stringify(cardData),
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка загрузки новой карточки на сервер')
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка удаления карточки с сервера')
            })
    }

    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify(avatar),
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка изменения аватара пользователя')
            })
    }

    changeLikeState(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка изменения статуса лайка')
            })
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        authorization: '87e35105-7976-45ad-9045-8a62b10cba0c',
        'Content-Type': 'application/json'
    }
});
