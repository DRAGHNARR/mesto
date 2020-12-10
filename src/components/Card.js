export default class Card {

  //static _template = document.querySelector("#post").content;

  constructor(name, url, selector, clickHandler) {
    this._name = name;
    this._url = url;
    this._selector = selector;
    this._clickHandler = clickHandler;
    this._popup = document.querySelector("#image-popup"); 
  }

  _getTemplate() {
    //console.log(this._template);
    //return this._template.cloneNode(true);
    return document.querySelector(this._selector).content.cloneNode(true);
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
      this._clickHandler(this._url, this._name);
    });
  }

  generate() {
    this._element = this._getTemplate();

    this._element.querySelector(".post__title").textContent = this._name;
    const elementImage = this._element.querySelector(".post__figure");
    elementImage.src = this._url;
    elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}