import './index.css'; 

import { initialCards, validationConfig } from '../components/consts.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

document.addEventListener("click", event => {
  if (event.target.classList.contains("popup")) {
    event.target.classList.remove("popup_active");
  }
});

const userInfo = new UserInfo({titleSelector: ".who__title", subtitleSelector: ".who__subtitle"});

const postFormValidator = new FormValidator(validationConfig, document.forms.post_form);
postFormValidator.enableValidation();

const whoFormValidator = new FormValidator(validationConfig, document.forms.who_form);
whoFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

const cardList = new Section({
    items: initialCards, 
    renderer: item => {
      const card = new Card(item.name, item.link, "#post", popupWithImage.open.bind(popupWithImage));
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    },
  }, 
  ".posts__box"
);
cardList.renderItems();

const popupWithPost = new PopupWithForm(
  "#post-popup", 
  ".who__button-add", 
  inputs => {
    inputs.forEach(input => {
      input.value = "";
    });
  },
  data => {
    const card = new Card(data.post_title, data.post_image, "#post", popupWithImage.open.bind(popupWithImage));
    const cardElement = card.generate();
    cardList.addItem(cardElement);
  }, 
  postFormValidator.toggleButtonState.bind(postFormValidator)
);

popupWithPost.setEventListeners();

const popupWithWho = new PopupWithForm(
  "#who-popup", 
  ".who__button-eddit",  
  inputs => {
    const data = userInfo.getUserInfo();
    console.log(data);
    inputs.who_title = data.title;
    inputs.who_subtitle = data.subtitle;
    console.log(inputs);
  },
  data => {
    userInfo.setUserInfo(data.who_title, data.who_subtitle);
  }, 
  whoFormValidator.toggleButtonState.bind(whoFormValidator)
);
popupWithWho.setEventListeners();