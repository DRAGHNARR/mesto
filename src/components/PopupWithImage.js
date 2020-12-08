import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(src, title) {
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose.bind(this));

    this._popupElement.querySelector(".popup__caption-title").textContent = title; 
    this._popupElement.querySelector(".popup__figure").src = src;
    /*
    this._popupElement.classList.add("popup_active");

    */
  }
}