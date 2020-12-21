export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const saveStates = {
    saved: "Сохранить",
    saving: "Сохранение..."
  }

export const userConfgig = {
  titleSelector: ".who__title", 
  subtitleSelector: ".who__subtitle", 
  figureSelector: ".who__figure",
}

export const userPopupConfgig = {
  selector: "#who-eddit-popup", 
  openSelector: ".who__figure",  
}

export const postPopupConfgig = {
  selector: "#post-popup", 
  openSelector: ".who__button-add",  
}

export const postDeletePopupConfgig = {
  selector: "#image-delete-popup", 
  openSelector: ".post__button-remove",  
}

export const whoPopupConfgig = {
  selector: "#who-popup", 
  openSelector: ".who__button-eddit",  
}

export const listnersConfig = {
  openEditFormButton: ".who__button-eddit",
  openAddFormButton: ".who__button-add",
  openFigureEdditFormButton: ".who__figure-eddit",
}

export const postSelectot = "#post";
export const imagePopupSelector = "#image-popup";

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: '0b2a6fdf-1704-45fb-a35d-1d4f050e76e7',
    'Content-Type': 'application/json'
  }
}

export const additionalPopupSelectors = {
    popup: "popup",
    activePopup: "popup_active",
    deletePopup: "#image-delete-popup"
}

export const figureAlt = "Изображение";

export const cardsContainer = ".posts__box";