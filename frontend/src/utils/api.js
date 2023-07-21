class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponseStatus(response, errorText) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`${errorText}: ${response.status}`)
    }

    getUresInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка загрузки информации о пользователе')
            })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
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
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка изменения данных пользователя')
            })
    }

    addNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            body: JSON.stringify(cardData),
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка загрузки новой карточки на сервер')
            })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка удаления карточки с сервера')
            })
    }

    setUserAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify(avatar),
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка изменения аватара пользователя')
            })
    }

    changeLikeState(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._checkResponseStatus(res, 'Ошибка изменения статуса лайка')
            })
    }
}

export const api = new Api({
    baseUrl: 'https://api.wildjuk-pr15-front.nomoredomains.xyz'
});
