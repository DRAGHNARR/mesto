import Popup from "./Popup.js";

export default class popupWithSubmit extends Popup {
  constructor(selector) {
    super(selector);
  }

  setSubmitAction(submitAction) {
    this._submit = submitAction;
  }

  setEventListeners () {
    super.setEventListeners();
    this._formElement.addEventListener("submit", event => {
      event.preventDefault();
      this._submit();
    });
  }
}