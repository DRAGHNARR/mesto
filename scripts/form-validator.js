export class FormValidator {
  constructor(inConfig, inForm) {
    this._config = inConfig;
    this._form = inForm;
  }

  _hideInputError(inForm, inInput, {errorClass, inputErrorClass, ...args}) {
    inInput.classList.remove(inputErrorClass);
    const error = inForm.querySelector(`#${inInput.id}-error`);
    error.classList.remove(errorClass);
    error.textContent = "";
  }
  
  _showInputError(inForm, inInput, inMessage, {errorClass, inputErrorClass, ...args}) {
    inInput.classList.add(inputErrorClass);
    const error = inForm.querySelector(`#${inInput.id}-error`);
    error.classList.add(errorClass);
    error.textContent = inMessage;
  }
  
  _isFormInvalid(inInputList) {
    return(inInputList.some(inputItem => {
      return(!inputItem.validity.valid);
    }));
  }
  
  _toggleButtonState(inInputList, inButton, {inactiveButtonClass, ...args}) {
    if (this._isFormInvalid(inInputList)) {
      inButton.classList.add(inactiveButtonClass);
      inButton.disabled = true;
    }
    else {
      inButton.classList.remove(inactiveButtonClass);
      inButton.disabled = false;
    }
  }

  _setEventListeners(inForm, {inputSelector, submitButtonSelector, ...args}) {
    const inputList = Array.from(inForm.querySelectorAll(inputSelector));
    const buttonSave = inForm.querySelector(submitButtonSelector)
  
    this._toggleButtonState(inputList, buttonSave, args);
  
    inForm.addEventListener("input", event => {
      if (event.target.validity.valid) {
        this._hideInputError(inForm, event.target, args);
      }
      else {
        this._showInputError(inForm, event.target, event.target.validationMessage, args);
      }
      this._toggleButtonState(inputList, buttonSave, args);
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", event => {
      event.preventDefault();
    });
  
    this._setEventListeners(this._form, this._config);
  }
}