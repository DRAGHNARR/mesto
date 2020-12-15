import './index.css'; 

import { initialCards, validationConfig } from '../components/consts.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

document.addEventListener("click", event => {
  if (event.target.classList.contains("popup")) {
    event.target.classList.remove("popup_active");
  }
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: '0b2a6fdf-1704-45fb-a35d-1d4f050e76e7',
    'Content-Type': 'application/json'
  }
}); 

const userFormValidator = new FormValidator(validationConfig, document.forms.who_eddit_form);
userFormValidator.enableValidation();

const popupWithUser = new PopupWithForm(
  "#who-eddit-popup", 
  ".who__figure",  
  inputs => {
    inputs[0].value = "";
  },
  data => {
    return api.setUserFigure(data.who_image)
      .then(res => {
        console.log(res);
        userInfo.setUserFigure(res.avatar);
      });
  }, 
  userFormValidator.toggleButtonState.bind(userFormValidator)
);
popupWithUser.setEventListeners();

const userInfo = new UserInfo({titleSelector: ".who__title", subtitleSelector: ".who__subtitle", figureSelector: ".who__figure", overlaySelector: ".who__figure-eddit"}, popupWithUser.open.bind(popupWithUser));
userInfo.setEventListeners();

api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res._id, res.name, res.about, res.avatar);
  });

//const userInfo = new UserInfo({titleSelector: ".who__title", subtitleSelector: ".who__subtitle"});

const postFormValidator = new FormValidator(validationConfig, document.forms.post_form);
postFormValidator.enableValidation();

const whoFormValidator = new FormValidator(validationConfig, document.forms.who_form);
whoFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

/* const cardList = new Section({
    items: initialCards, 
    renderer: item => {
      const card = new Card(item.name, item.link, "#post", popupWithImage.open.bind(popupWithImage));
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    },
  }, 
  ".posts__box"
);
cardList.renderItems(); */

const cardList = new Section({
  items: [], 
  renderer: item => {
      const card = new Card(item.name, item.link, false, "#post", popupWithImage.open.bind(popupWithImage));
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    },
  }, 
  ".posts__box"
);


api.getCards()
  .then(res => {
    res.forEach(item => {
      const card = new Card(item._id, userInfo.id, item.name, item.link, item.likes, api.likeCard.bind(api), api.dislikeCard.bind(api), userInfo.id == item.owner._id, api.deleteCard.bind(api), "#post", popupWithImage.open.bind(popupWithImage));
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    });
  });

const popupWithPost = new PopupWithForm(
  "#post-popup", 
  ".who__button-add", 
  inputs => {
    inputs.forEach(input => {
      input.value = "";
    });
  },
  data => {
    return api.setCard(data.post_title, data.post_image)
    .then(res => {
      const card = new Card(res._id, userInfo.id, res.name, res.link, res.likes, api.likeCard.bind(api), api.dislikeCard.bind(api), userInfo.id == res.owner._id, api.deleteCard.bind(api), "#post", popupWithImage.open.bind(popupWithImage));
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    });

  }, 
  postFormValidator.toggleButtonState.bind(postFormValidator)
);

popupWithPost.setEventListeners();

const popupWithWho = new PopupWithForm(
  "#who-popup", 
  ".who__button-eddit",  
  inputs => {
    const data = userInfo.getUserInfo();
    inputs[0].value = data.title;
    inputs[1].value = data.subtitle;
  },
  data => {
    return api.setUserInfo(data.who_title, data.who_subtitle)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);
      });
  }, 
  whoFormValidator.toggleButtonState.bind(whoFormValidator)
);
popupWithWho.setEventListeners();

const openEditFormButton = document.querySelector('.who__button-eddit');
openEditFormButton.addEventListener('click', () => popupWithWho.open());

const openAddFormButton = document.querySelector('.who__button-add');
openAddFormButton.addEventListener('click', () => popupWithPost.open());