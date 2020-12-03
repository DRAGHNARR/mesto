import { eventClosePopup, closePopup } from './index.js'

export class Card {

  //static _template = document.querySelector("#post").content;

  constructor(name, url) {
    this._name = name;
    this._url = url;
  }

  _getTemplate() {
    //console.log(this._template);
    //return this._template.cloneNode(true);
    return document.querySelector("#post").content.cloneNode(true);
  }

  _like(button) {
    button.classList.toggle("post__button-like_active");
  }

  _remove(card) {
    card.remove();
  }

  _setEventListeners() {
    this._element.querySelector(".post__button-remove").addEventListener("click", event => {
      this._remove(event.target.closest(".post"));
    });
  
    this._element.querySelector(".post__button-like").addEventListener("click", event => {
      this._like(event.target);
    });

    this._element.querySelector(".post__figure").addEventListener("click", event => {
      const popup = document.querySelector("#image-popup");
      popup.classList.add("popup_active");
      document.addEventListener("keydown", eventClosePopup);
      
      popup.querySelector(".popup__caption-title").textContent = event.target.closest(".post").querySelector(".post__title").textContent;
      popup.querySelector(".popup__figure").src = event.target.src;
    });
  }

  _openPopup() {
    const popup = document.querySelector("#image-popup");
    popup.classList.add("popup_active");
    document.addEventListener("keydown", eventClosePopup);
  }

  generate() {
    this._element = this._getTemplate();

    this._element.querySelector(".post__title").textContent = this._name.value ? this._name.value : this._name;
    this._element.querySelector(".post__figure").src = this._url.value ? this._url.value : this._url;

    this._setEventListeners();

    return this._element;
  }
}