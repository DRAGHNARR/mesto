/* post-inital begin */
const postTemplate = getPostTemplate();
const posts = document.querySelector(".posts__box");
const imagePopup = document.querySelector("#image-popup");
const imageButtonClose = imagePopup.querySelector(".popup__button-close");

loadInitialPosts(posts, imagePopup, initialCards);

imageButtonClose.addEventListener("click", event => {
  closePopup(imagePopup);
});
/* post-initial end */
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

  addPost(posts, createPost(imagePopup, postPopupTitle, postPopupImage)); 
  closePopup(postPopup);
});
/* post-creation end */
/* who-eddit begin */
const whoPopup = document.querySelector("#who-popup");
const whoPopupForm = whoPopup.querySelector(".popup__form");
const whoButtonEdit = document.querySelector(".who__button-eddit");
const whoButtonClose = whoPopup.querySelector(".popup__button-close");
const whoButtonSave = whoPopup.querySelector(".popup__button-save");

const whoPopupTitle = whoPopup.querySelector("#who-title");
const whoPopupSubitle = whoPopup.querySelector("#who-subtitle");

const whoTitle = document.querySelector(".who__title");
const whoSubtitle = document.querySelector(".who__subtitle");

whoButtonEdit.addEventListener("click", event => {
  whoPopupTitle.value = whoTitle.textContent;
  whoPopupSubitle.value = whoSubtitle.textContent;
  openPopup(whoPopup);
  toggleButtonState([whoPopupTitle, whoPopupSubitle], whoButtonSave, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });
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

function openPopup(popup) {
  popup.classList.add("popup_active");

  document.addEventListener("keydown", eventClosePopup);
}

function eventClosePopup(event) {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup);
    document.removeEventListener("keydown", eventClosePopup);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

function getPostTemplate() {
  const tempalte = document.querySelector("#post").content;
  return tempalte;
}

function removePost(post) {
  post.remove();
}

function likePost(buttonLike) {
  buttonLike.classList.toggle("post__button-like_active");
}

function createPost(imagePopup, name, url) {
  const post = postTemplate.cloneNode(true);

  post.querySelector(".post__title").textContent = name.value ? name.value : name;
  post.querySelector(".post__figure").src = url.value ? url.value : url;

  post.querySelector(".post__button-remove").addEventListener("click", event => {
    removePost(event.target.closest(".post"));
  });

  post.querySelector(".post__button-like").addEventListener("click", event => {
    likePost(event.target);
  });

  post.querySelector(".post__figure").addEventListener("click", event => {
    openPopup(imagePopup);
    
    imagePopup.querySelector(".popup__caption-title").textContent = event.target.closest(".post").querySelector(".post__title").textContent;
    imagePopup.querySelector(".popup__figure").src = event.target.src;
  });

  return(post);
}

function addPost(posts, post) {
  posts.prepend(post);
}

function loadInitialPosts(posts, imagePopup, initialCards) {
  initialCards.forEach(card => {
    addPost(posts, createPost(imagePopup, card.name, card.link))
  });
}

document.addEventListener("click", event => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
});