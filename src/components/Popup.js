export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._buttonCloseElement = this._popupElement.querySelector(".popup__button-close");
    this._openElememt = document.querySelector(selector);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  setEventListeners() {
    /* this._popupElement.addEventListener("click", this.open.bind(this)); */
    this._buttonCloseElement.addEventListener("click", this.close.bind(this));
  }
}