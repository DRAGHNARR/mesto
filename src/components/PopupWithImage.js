import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupCardImage = this._popupElement.querySelector(".popup__caption-title");
    this._captionImage = this._popupElement.querySelector(".popup__figure");
  }

  open(src, title, alt) {
    this._popupCardImage.textContent = title; 
    this._captionImage.src = src;
    this._captionImage.alt = alt;

    super.open();
    /*
    this._popupElement.classList.add("popup_active");

    */
  }
}