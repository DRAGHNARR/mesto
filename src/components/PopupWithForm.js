import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({selector, openSelector}, opener, submitter) {
    super(selector);

    this._openElement = document.querySelector(openSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._opener = opener;
    this._submitter = submitter;
    this._buttonSaveELement = this._popupElement.querySelector(".popup__button-save");
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
    this.setButtonContent("Сохранение...");
    this._submitter(this._getInputValues());
  }

  setButtonContent(content) {
    this._buttonSaveELement.textContent = content;
  }

  open() {
    this._opener(this._inputs);
    super.open();
  }

  close() {
    this._formElement.reset();
    super.close(); 
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._submit.bind(this));
  }
}