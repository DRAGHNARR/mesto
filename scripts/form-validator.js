export class FormValidator {
  constructor(inConfig, inForm) {
    this._config = inConfig;
    this._form = inForm;
    this._inputList = Array.from(inForm.querySelectorAll(this._config.inputSelector));
    this._buttonSave = inForm.querySelector(this._config.submitButtonSelector)
  }

  _hideInputError(inInput) {
    inInput.classList.remove(this._config.inputErrorClass);
    const error = this._form.querySelector(`#${inInput.id}-error`);
    error.classList.remove(this._config.errorClass);
    error.textContent = "";
  }
  
  _showInputError(inInput, inMessage) {
    inInput.classList.add(this._config.inputErrorClass);
    const error = this._form.querySelector(`#${inInput.id}-error`);
    error.classList.add(this._config.errorClass);
    error.textContent = inMessage;
  }
  
  _isFormInvalid() {
    return(this._inputList.some(inputItem => {
      return(!inputItem.validity.valid);
    }));
  }
  
  toggleButtonState() {
    if (this._isFormInvalid()) {
      this._buttonSave.classList.add(this._config.inactiveButtonClass);
      this._buttonSave.disabled = true;
    }
    else {
      this._buttonSave.classList.remove(this._config.inactiveButtonClass);
      this._buttonSave.disabled = false;
    }
  }

  _setEventListeners(inForm) {
    this.toggleButtonState();
  
    inForm.addEventListener("input", event => {
      if (event.target.validity.valid) {
        this._hideInputError(event.target);
      }
      else {
        this._showInputError(event.target, event.target.validationMessage);
      }
      this.toggleButtonState();
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", event => {
      event.preventDefault();
    });
  
    this._setEventListeners(this._form, this._config);
  }
}