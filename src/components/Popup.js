export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._buttonCloseElement = this._popupElement.querySelector(".popup__button-close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    /* this._popupElement.addEventListener("click", this.open.bind(this)); */
    this._buttonCloseElement.addEventListener("click", this.close.bind(this));
  }
}