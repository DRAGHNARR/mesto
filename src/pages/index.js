import './index.css'; 

import { imagePopupSelector, postSelectot, userConfgig, userPopupConfgig, postDeletePopupConfgig, postPopupConfgig, whoPopupConfgig, listnersConfig, validationConfig } from '../utils/consts.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { createCard } from "../utils/utils.js";

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
  userPopupConfgig, 
  inputs => {
    inputs[0].value = "";
  },
  data => {
    return api.setUserFigure(data.who_image)
      .then(res => {
        userInfo.setUserInfo({figure: res.avatar});
      })
      .catch(err => console.log(err)); 
  }, 
  userFormValidator.toggleButtonState.bind(userFormValidator)
);
popupWithUser.setEventListeners();

const userInfo = new UserInfo(userConfgig);

api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo({id: res._id, title: res.name, subtitle: res.about, figure: res.avatar});
  })
  .catch(err => console.log(err)); 

//const userInfo = new UserInfo({titleSelector: ".who__title", subtitleSelector: ".who__subtitle"});

const postFormValidator = new FormValidator(validationConfig, document.forms.post_form);
postFormValidator.enableValidation();

const whoFormValidator = new FormValidator(validationConfig, document.forms.who_form);
whoFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(imagePopupSelector);
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
      const card = createCard({
        cardSelector: postSelectot,
        cardID: item._id, 
        userID: userInfo.id, 
        cardTitle: item.name, 
        cardURL: item.link, 
        cardAlt: "Изображение", 
        cardLikes: item.likes, 
        cardIsDeletable: userInfo.id === item.owner._id, 
        cardMethodLike: api.likeCard.bind(api), 
        cardMethodDislike: api.dislikeCard.bind(api), 
        cardMethodDelete: (id) => {
          submitPopup.setSubmitAction(() => {
            api.deleteCard(card.id)
              .then(res => {
                card.remove()
              })
              .catch(err => console.log(err)); 
          })
          submitPopup.open();
        },
        cardMethodOpen: popupWithImage.open.bind(popupWithImage), 
      });
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    },
  },  
  ".posts__box"
);


api.getCards()
  .then(res => {
    res.forEach(item => {
      const card = createCard({
        cardSelector: postSelectot,
        cardID: item._id, 
        userID: userInfo.id, 
        cardTitle: item.name, 
        cardURL: item.link, 
        cardAlt: "Изображение", 
        cardLikes: item.likes, 
        cardIsDeletable: userInfo.id === item.owner._id, 
        cardMethodLike: api.likeCard.bind(api), 
        cardMethodDislike: api.dislikeCard.bind(api), 
        cardMethodDelete: () => {
          popupWithPostDelete.setSubmitAction(() => {
            api.deleteCard(card.id)
              .then(res => {
                card.remove().bind(card);
              })
              .catch(err => console.log(err)); 
          })
          popupWithPostDelete.open();
        },
        cardMethodOpen: popupWithImage.open.bind(popupWithImage), 
      });
      const cardElement = card.generate();
      cardList.addItem(cardElement);
    });
  });

const popupWithPostDelete = new PopupWithSubmit("#image-delete-popup");
popupWithPostDelete.setEventListeners();

const popupWithPost = new PopupWithForm(
  postPopupConfgig, 
  inputs => {
    inputs.forEach(input => {
      input.value = "";
    });
  },
  data => {
    return api.setCard(data.post_title, data.post_image)
      .then(res => {
        const card = createCard({
          cardSelector: postSelectot,
          cardID: res._id, 
          userID: userInfo.id, 
          cardTitle: res.name, 
          cardURL: res.link, 
          cardAlt: "Изображение", 
          cardLikes: res.likes, 
          cardIsDeletable: userInfo.id === res.owner._id, 
          cardMethodLike: api.likeCard.bind(api), 
          cardMethodDislike: api.dislikeCard.bind(api), 
          cardMethodDelete: event => {
            popupWithPostDelete.setSubmitAction(() => {
              api.deleteCard(card.id)
                .then(res => {
                  popupWithPostDelete.close();
                  card.remove();
                })
                .catch(err => console.log(err)); 
            })
            popupWithPostDelete.open();
          },
          cardMethodOpen: popupWithImage.open.bind(popupWithImage), 
        });
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      })
      .then(res => {
        popupWithPost.close();
        popupWithPost.setButtonContent("Сохранить");
      })
      .catch(err => console.log(err)); 
  }
);
popupWithPost.setEventListeners();

const popupWithWho = new PopupWithForm(
  whoPopupConfgig,
  inputs => {
    const data = userInfo.getUserInfo();
    inputs[0].value = data.title;
    inputs[1].value = data.subtitle;
  },
  data => {
    return api.setUserInfo(data.who_title, data.who_subtitle)
      .then(res => {
        userInfo.setUserInfo({id: res._id, title: res.name, subtitle: res.about, figure: res.avatar});
      })
      .then(res => {
        popupWithWho.close();
        popupWithWho.setButtonContent("Сохранить");
      })
      .catch(err => console.log(err)); 
  }
);
popupWithWho.setEventListeners();

const openEditFormButton = document.querySelector(listnersConfig.openEditFormButton);
openEditFormButton.addEventListener('click', () => {
  whoFormValidator.resetErrors();
  whoFormValidator.toggleButtonState();
  popupWithWho.open()
});

const openAddFormButton = document.querySelector(listnersConfig.openAddFormButton);
openAddFormButton.addEventListener('click', () => {
  postFormValidator.resetErrors();
  postFormValidator.toggleButtonState();
  popupWithPost.open()
});

const openFigureEdditFormButton = document.querySelector(listnersConfig.openFigureEdditFormButton);
openFigureEdditFormButton.addEventListener('click', () => popupWithUser.open());