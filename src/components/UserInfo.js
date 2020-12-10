export default class UserInfo {
  constructor({titleSelector, subtitleSelector}) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent, 
      subtitle: this._subtitleElement.textContent
    };
  }

  setUserInfo(title, subtitle) {
    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
  }
}