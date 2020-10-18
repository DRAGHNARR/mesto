let popup = document.querySelector(".popup");
let buttonEdit = document.querySelector(".who__button-eddit");
let buttonClose = document.querySelector(".popup__button-close");
let buttonSave = document.querySelector(".popup__button-save");

function popupOpen(event) {
  // console.log(popup);

  document.querySelector(".popup__input_type_title").value = document.querySelector(".who__title").textContent;
  document.querySelector(".popup__input_type_subtitle").value = document.querySelector(".who__subtitle").textContent;
  
  popup.classList.add("popup_active");
}

function popupClose(event) {
  // console.log(popup);
  popup.classList.remove("popup_active");
}

function popupSave(event) {
  event.preventDefault();
  document.querySelector(".who__title").textContent = document.querySelector(".popup__input_type_title").value;
  document.querySelector(".who__subtitle").textContent = document.querySelector(".popup__input_type_subtitle").value;
  
  popupClose()
}

// popupOpen(popup);

buttonEdit.addEventListener("click", popupOpen);
buttonClose.addEventListener("click", popupClose);
buttonSave.addEventListener("click", popupSave);