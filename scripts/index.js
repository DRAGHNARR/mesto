import { initialCards, validationConfig } from './consts.js'
import { Card } from './card.js'
import { FormValidator } from './form-validator.js'

document.addEventListener("click", event => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
});

const posts = document.querySelector(".posts__box");
const imagePopup = document.querySelector("#image-popup");
const imageButtonClose = imagePopup.querySelector(".popup__button-close");
const postSelector = "#post";

function loadInitialPosts(posts, initialCards) {
  initialCards.forEach(data => {
    const card = new Card(data.name, data.link, postSelector, openPopup);
    const post = card.generate()
  
    addPost(posts, post);
  });
}

function addPost(posts, post) {
  posts.prepend(post);
}

export function eventClosePopup(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_active");

  document.addEventListener("keydown", eventClosePopup);
}

export function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", eventClosePopup);
}

imageButtonClose.addEventListener("click", event => {
  closePopup(imagePopup);
});

loadInitialPosts(posts, initialCards);

/* post-creation begin */
const postPopup = document.querySelector("#post-popup");
const postPopupForm = postPopup.querySelector(".popup__form");
const postButtonAdd = document.querySelector(".who__button-add");
const postButtonClose = postPopup.querySelector(".popup__button-close");

const postPopupTitle = postPopup.querySelector("#post-title");
const postPopupImage = postPopup.querySelector("#post-image");

postButtonAdd.addEventListener("click", event => {
  postPopupTitle.value = "";
  postPopupImage.value = "";

  openPopup(postPopup);
});

postButtonClose.addEventListener("click", event => {
  closePopup(postPopup);
});

postPopupForm.addEventListener("submit", event => {
  event.preventDefault();

  const card = new Card(postPopupTitle.value, postPopupImage.value, postSelector, openPopup);
  addPost(posts, card.generate()); 
  closePopup(postPopup);
});

const postFormValidator = new FormValidator(validationConfig, document.forms.post_form);
postFormValidator.enableValidation();
/* post-creation end */
/* who-eddit begin */
const whoPopup = document.querySelector("#who-popup");
const whoPopupForm = whoPopup.querySelector(".popup__form");
const whoButtonEdit = document.querySelector(".who__button-eddit");
const whoButtonClose = whoPopup.querySelector(".popup__button-close");

const whoPopupTitle = whoPopup.querySelector("#who-title");
const whoPopupSubitle = whoPopup.querySelector("#who-subtitle");

const whoTitle = document.querySelector(".who__title");
const whoSubtitle = document.querySelector(".who__subtitle");

const whoFormValidator = new FormValidator(validationConfig, document.forms.who_form);
whoFormValidator.enableValidation();

whoButtonEdit.addEventListener("click", event => {
  whoPopupTitle.value = whoTitle.textContent;
  whoPopupSubitle.value = whoSubtitle.textContent;
  openPopup(whoPopup);
  whoFormValidator.toggleButtonState();
});

whoButtonClose.addEventListener("click", event => {
  closePopup(whoPopup);
});

whoPopupForm.addEventListener("submit", event => {
  event.preventDefault();

  whoTitle.textContent = whoPopupTitle.value;
  whoSubtitle.textContent = whoPopupSubitle.value;
  closePopup(whoPopup);
});
/* who-eddit end */