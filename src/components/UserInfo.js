export default class UserInfo {
  constructor({titleSelector, subtitleSelector, figureSelector}) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
    this._figureElement = document.querySelector(figureSelector);
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent, 
      subtitle: this._subtitleElement.textContent,
      figure: this._figureElement.src
    };
  }

  setUserInfo({id, title, subtitle, figure}) {
    if (id) {
      this.id = id;
    }
    if (title) {
      this._titleElement.textContent = title;
    }
    if (subtitle) {
      this._subtitleElement.textContent = subtitle;
    }
    if (figure) {
      this._figureElement.src = figure;
    }
  }
}