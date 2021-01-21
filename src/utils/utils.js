import Card from '../components/Card.js';

export function createCard(inProperties) {
  return new Card(inProperties);
}

export function renderLoading(buttonElement, state) {
  buttonElement.textContent = state;
}