export default class Card {

  //static _template = document.querySelector("#post").content;

  constructor(id, userId, name, url, likes, liker, disliker, deletable, deleter, selector, clickHandler) {
    this._id = id;
    this._userId = userId;
    this._name = name;
    this._url = url;
    this._likes = likes;
    this._liker = liker;
    this._disliker = disliker;
    this._deletable = deletable;
    this._deleter = deleter;
    this._selector = selector;
    this._clickHandler = clickHandler;
    this._popup = document.querySelector("#image-popup"); 
  }

  _getTemplate() {
    //console.log(this._template);
    //return this._template.cloneNode(true);
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _isLiked() {
    return this._likes.some(item => {
      return item._id == this._userId});
  }

  _like(button) {
    button.classList.add("post__button-like_active");
  }

  _dislike(button) {
    button.classList.remove("post__button-like_active");
  }

  _remove(card) {
    card.remove();
  }

  _setEventListeners() {
    this._element.querySelector(".post__button-remove").addEventListener("click", event => {
      this._clickHandler(this._url, this._name);
      this._deleter(this._id);
      this._remove(event.target.closest(".post"));
    });
  
    this._element.querySelector(".post__button-like").addEventListener("click", event => {
      if (!this._isLiked()) {
        this._liker(this._id)
          .then(res => {
            this._likes = res.likes;
            this._like(event.target);
            this._likeCountElement.textContent = this._likes.length;
          });
      }
      else {
        this._disliker(this._id)
          .then(res => {
            this._likes = res.likes;
            this._dislike(event.target);
            this._likeCountElement.textContent = this._likes.length;
          });
      }
    });

    this._element.querySelector(".post__figure").addEventListener("click", event => {
      this._clickHandler(this._url, this._name);
    });
  }

  generate() {
    this._element = this._getTemplate();
    this._likeCountElement = this._element.querySelector(".post__like-count");
    this._likeButtonElement = this._element.querySelector(".post__button-like");

    this._element.querySelector(".post__title").textContent = this._name;
    this._element.querySelector(".post__like-count").textContent = this._likes.length;
    const elementImage = this._element.querySelector(".post__figure");
    elementImage.src = this._url;
    elementImage.alt = this._name;

    if (!this._deletable) {
      this._element.querySelector(".post__button-remove").classList.add("post__button-remove_disable");
    }
    
    if (this._isLiked()) {
      this._like(this._likeButtonElement);
    }
    else {
      this._dislike(this._likeButtonElement);
    }

    this._setEventListeners();

    return this._element;
  }
}