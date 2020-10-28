const postTemplate = getPostTemplate();
const posts = document.querySelector(".posts__box");

function getPostTemplate () {
  const tempalte = document.querySelector("#post").content;
  return tempalte;
}

function addPostInitial(posts, name, url) {
  const post = postTemplate.cloneNode(true);

  post.querySelector(".post__title").textContent = name;
  post.querySelector(".post__figure").src = url;

  post.querySelector(".post__button-remove").addEventListener("click", event => {
    event.target.parentNode.parentNode.parentNode.remove();
  });

  post.querySelector(".post__button-like").addEventListener("click", event => {
    event.target.classList.toggle("post__button-like_active");
  });

  post.querySelector(".post__figure").addEventListener("click", event => {
    imagePopup.classList.add("popup_active");
    
    imagePopup.querySelector(".popup__caption-title").textContent = event.target.parentNode.parentNode.querySelector(".post__title").textContent;
    imagePopup.querySelector(".popup__figure").src = event.target.src;

  });

  posts.append(post);
}

const addPost = function (config) {
  const post = postTemplate.cloneNode(true);

  post.querySelector(".post__title").textContent = config.postPopupTitle.value;
  post.querySelector(".post__figure").src = config.postPopupImage.value;

  post.querySelector(".post__button-remove").addEventListener("click", event => {
    event.target.parentNode.parentNode.parentNode.remove();
  });

  post.querySelector(".post__button-like").addEventListener("click", event => {
    event.target.classList.toggle("post__button-like_active");
  });

  post.querySelector(".post__figure").addEventListener("click", event => {    
    imagePopup.classList.add("popup_active");
    
    imagePopup.querySelector(".popup__caption-title").textContent = event.target.parentNode.parentNode.querySelector(".post__title").textContent;
    imagePopup.querySelector(".popup__figure").src = event.target.src;
  });

  config.posts.append(post);
}

const edditWho = function (config) {
  console.log(config);
  config.whoTitle.textContent = config.whoPopupTitle.value;
  config.whoSubtitle.textContent = config.whoPopupSubitle.value;
}

function popupClose(popup) {
  popup.classList.remove("popup_active");
}

function popupOpen(popup, defaults) {
  popup.classList.add("popup_active");

  defaults.forEach(item => {
    item[0].value = item[1].textContent ? item[1].textContent : item[1];
  });
}

function addActionOpen(popup, popupButtonOpen, defaults) {
  popupButtonOpen.addEventListener("click", event => {
    popupOpen(popup, defaults);
  });
}

function addActionClose(popup, popupButtonClose) {
  popupButtonClose.addEventListener("click", event => {
    popupClose(popup);
  });
}

function addActionSubmit(popup, popupForm, action, config) {
  popupForm.addEventListener("submit", event => {
    event.preventDefault();

    action(config);
    popupClose(popup);
  });
}

initialCards.forEach(card => {
  addPostInitial(posts, card.name, card.link);
});

const postPopup = document.querySelector("#post-popup");
const postPopupForm = postPopup.querySelector(".popup__form");
const postButtonAdd = document.querySelector(".who__button-add");
const postButtonClose = postPopup.querySelector(".popup__button-close");

const postPopupTitle = postPopup.querySelector(".popup__input_type_post-title");
const postPopupImage = postPopup.querySelector(".popup__input_type_post-image");

addActionOpen(postPopup, postButtonAdd, [[postPopupTitle, ""], [postPopupImage, ""]]);
addActionClose(postPopup, postButtonClose);
addActionSubmit(postPopup, postPopupForm, addPost, {posts: posts, postPopupTitle: postPopupTitle, postPopupImage: postPopupImage});

const whoPopup = document.querySelector("#who-popup");
const whoPopupForm = whoPopup.querySelector(".popup__form");
const whoButtonEdit = document.querySelector(".who__button-eddit");
const whoButtonClose = whoPopup.querySelector(".popup__button-close");

const whoPopupTitle = whoPopup.querySelector(".popup__input_type_title");
const whoPopupSubitle = whoPopup.querySelector(".popup__input_type_subtitle");

const whoTitle = document.querySelector(".who__title");
const whoSubtitle = document.querySelector(".who__subtitle");

addActionOpen(whoPopup, whoButtonEdit, [[whoPopupTitle, whoTitle], [whoPopupSubitle, whoSubtitle]]);
addActionClose(whoPopup, whoButtonClose);
addActionSubmit(whoPopup, whoPopupForm, edditWho, {whoTitle: whoTitle, whoSubtitle: whoSubtitle, whoPopupTitle: whoPopupTitle, whoPopupSubitle: whoPopupSubitle});

const imagePopup = document.querySelector("#image-popup");
const imageButtonClose = imagePopup.querySelector(".popup__button-close");

const imagePopupFigure = imagePopup.querySelector(".popup__figure");
const imagePopupTitle = imagePopup.querySelector(".popup__caption-title");

addActionClose(imagePopup, imageButtonClose);