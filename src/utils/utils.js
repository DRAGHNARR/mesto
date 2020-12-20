import Card from '../components/Card.js';

export function createCard(cardIntitalObject) {
  return new Card(cardIntitalObject);
}

export function renderLoading(buttonElement, state) {
  buttonElement.textContent = state;
}