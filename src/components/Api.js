export default class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.header = headers;
    this.userUrl = baseUrl + "/users/me";
    this.cardUrl = baseUrl + "/cards";
    this.likeUrl = baseUrl + "/cards/likes";
    this.userFigureUrl = baseUrl + "/users/me/avatar";
  }

  getUserInfo() {
    return fetch(this.userUrl, {headers: this.header})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  setUserInfo(name, about) {
    return fetch(this.userUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  setUserFigure(url) {
    return fetch(this.userFigureUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        avatar: url
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  getCards() {
    return fetch(this.cardUrl, {headers: this.header})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  setCard(name, link) {
    return fetch(this.cardUrl, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  deleteCard(id) {
    return fetch(this.cardUrl + "/" + id, {
      method: 'DELETE',
      headers: this.header
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  likeCard(id) {
    return fetch(this.likeUrl + "/" + id, {
      method: 'PUT',
      headers: this.header
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }

  dislikeCard(id) {
    return fetch(this.likeUrl + "/" + id, {
      method: 'DELETE',
      headers: this.header
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("bad day");
    });
  }
}