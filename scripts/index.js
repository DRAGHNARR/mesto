const popup = document.querySelector(".popup");

const buttonEdit = document.querySelector(".who__button-eddit");
const buttonClose = document.querySelector(".popup__button-close");
const popupForm = document.querySelector(".popup__form");

const popupTitle = document.querySelector(".popup__input_type_title");
const popupSubitle = document.querySelector(".popup__input_type_subtitle");

const whoTitle = document.querySelector(".who__title");
const whoSubtitle = document.querySelector(".who__subtitle");

function popupOpen(event) {
  // console.log(popup);

  popupTitle.value = whoTitle.textContent;
  popupSubitle.value = whoSubtitle.textContent;
  
  popup.classList.add("popup_active");
}

function popupClose(event) {
  // console.log(popup);
  popup.classList.remove("popup_active");
}

function popupSave(event) {
  event.preventDefault();
  whoTitle.textContent = popupTitle.value;
  whoSubtitle.textContent = popupSubitle.value;
  
  popupClose()
}

// popupOpen(popup);

buttonEdit.addEventListener("click", popupOpen);
buttonClose.addEventListener("click", popupClose);
popupForm.addEventListener("submit", popupSave);