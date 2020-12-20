export default class Card {

  //static _template = document.querySelector("#post").content;

  constructor({cardSelector, cardID, userID, cardTitle, cardURL, cardAlt, cardLikes, cardIsDeletable, cardMethodLike, cardMethodDislike, cardMethodDelete, cardMethodOpen}) {

    this._selector = cardSelector;
    this.id = cardID;
    this._userId = userID;
    this._name = cardTitle;
    this._url = cardURL;
    this._alt = cardAlt;
    this._likes = cardLikes;
    this._liker = cardMethodLike;
    this._disliker = cardMethodDislike;
    this._deletable = cardIsDeletable;
    this._deleter = cardMethodDelete;
    this._clickHandler = cardMethodOpen; 
  }

  _getTemplate() {
    //console.log(this._template);
    //return this._template.cloneNode(true);
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _isLiked() {
    return this._likes.some(item => {
      return item._id === this._userId});
  }

  _like(button) {
    button.classList.add("post__button-like_active");
  }

  _dislike(button) {
    button.classList.remove("post__button-like_active");
  }

  remove() {
    this._postElement.remove();
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener("click", event => {
      this._deleter(this.id);
      //this.remove(event.target.closest(".post"));
    });
  
    this._element.querySelector(".post__button-like").addEventListener("click", event => {
      if (!this._isLiked()) {
        this._liker(this.id)
          .then(res => {
            this._likes = res.likes;
            this._like(event.target);
            this._likeCountElement.textContent = this._likes.length;
          });
      }
      else {
        this._disliker(this.id)
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
    this._postElement = this._element.querySelector(".post");
    this._buttonRemove = this._element.querySelector(".post__button-remove");
    this._likeCountElement = this._element.querySelector(".post__like-count");
    this._likeButtonElement = this._element.querySelector(".post__button-like");

    this._element.querySelector(".post__title").textContent = this._name;
    this._element.querySelector(".post__like-count").textContent = this._likes.length;
    const elementImage = this._element.querySelector(".post__figure");
    elementImage.src = this._url;
    elementImage.alt = this._name;

    if (!this._deletable) {
      this._buttonRemove.classList.add("post__button-remove_disable");
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