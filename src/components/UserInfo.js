export default class UserInfo {
  constructor({titleSelector, subtitleSelector, figureSelector, overlaySelector}, clickHandler) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
    this._figureElement = document.querySelector(figureSelector);
    this._overlayElement = document.querySelector(overlaySelector);
    this._clickHandler = clickHandler;
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent, 
      subtitle: this._subtitleElement.textContent,
      figure: this._figureElement.src
    };
  }

  setUserInfo(id, title, subtitle, figure) {
    this.id = id;
    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
    this._figureElement.src = figure;
  }

  setUserFigure(figure) {
    this._figureElement.src = figure;
  }

  setEventListeners() {
    this._overlayElement.addEventListener("click", event => {
      event.preventDefault();
      this._clickHandler();
    });
  }
}