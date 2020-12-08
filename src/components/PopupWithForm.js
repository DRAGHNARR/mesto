import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, openSelector, opener, submitter, checkValidity) {
    super(selector);

    this._openElement = document.querySelector(openSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._opener = opener;
    this._submitter = submitter;
    this._checkValidity = checkValidity;
    this._inputs = this._popupElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const popupValues = {};
    this._inputs.forEach(input => {
      popupValues[input.name] = input.value;
    });
    return popupValues;
  }

  _submit(event) {
    event.preventDefault();
    this._submitter(this._getInputValues());
    this.close();
  }

  open() {
    this._opener(this._inputs);
    this._checkValidity();
    this._popupElement.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this._buttonCloseElement.addEventListener("click", this.close.bind(this));
    this._openElement.addEventListener("click", this.open.bind(this));
    this._formElement.addEventListener("submit", this._submit.bind(this));
  }
}