class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._headers = headers;
    
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
    this._token = token;
  }

  getInitialData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }


  _getResponseData(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
      })
      .then(res => this._getResponseData(res))
  }

  saveUserChanges(name, about) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  changedAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  }

  postNewCard( name, link ) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  likedCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  dislikedCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
  }
}

// const api = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
//   headers: "6d6f7c25-ff0c-4cc3-89b7-0784d16e6e95",
//   }
// );

const api = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;