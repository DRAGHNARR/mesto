enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 

function enableValidation(config) {
  const formList = Array.from(document.forms);

  formList.forEach(formItem => {
    formItem.addEventListener("submit", event => {
      event.preventDefault();
    });

    setEventListeners(formItem, config);
  });
}

function setEventListeners(inForm, {inputSelector, submitButtonSelector, ...args}) {
  const inputList = Array.from(inForm.querySelectorAll(inputSelector));
  const buttonSave = inForm.querySelector(submitButtonSelector)

  toggleButtonState(inputList, buttonSave, args);

  inForm.addEventListener("input", event => {
    if (event.target.validity.valid) {
      hideInputError(inForm, event.target, args);
    }
    else {
      showInputError(inForm, event.target, event.target.validationMessage, args);
    }
    toggleButtonState(inputList, buttonSave, args);
  });
}

function hideInputError(inForm, inInput, {errorClass, inputErrorClass, ...args}) {
  inInput.classList.remove(inputErrorClass);
  error = inForm.querySelector(`#${inInput.id}-error`);
  error.classList.remove(errorClass);
  error.textContent = "";
}

function showInputError(inForm, inInput, inMessage, {errorClass, inputErrorClass, ...args}) {
  inInput.classList.add(inputErrorClass);
  error = inForm.querySelector(`#${inInput.id}-error`);
  error.classList.add(errorClass);
  error.textContent = inMessage;
}

function isFormInvalid(inInputList) {
  return(inInputList.some(inputItem => {
    return(!inputItem.validity.valid);
  }));
}

function toggleButtonState(inInputList, inButton, {inactiveButtonClass, ...args}) {
  if (isFormInvalid(inInputList)) {
    inButton.classList.add(inactiveButtonClass);
    inButton.disabled = true;
  }
  else {
    inButton.classList.remove(inactiveButtonClass);
    inButton.disabled = false;
  }
}