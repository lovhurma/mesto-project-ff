import '../pages/index.css';
import { initialCards } from './cards.js'


const cardTemplate = document.querySelector('#card-template').content
const cardPlaceList = document.querySelector('.places__list')

// @todo: Функция создания карточки

function createCard(element, cardDelete) {
const placeTemplate = cardTemplate.querySelector('.places__item').cloneNode(true)

const cardImage = placeTemplate.querySelector('.card__image')
const cardTitle = placeTemplate.querySelector('.card__title')
const deleteCard = placeTemplate.querySelector('.card__delete-button')

cardImage.src = element.link;
cardTitle.textContent = element.name;
cardImage.alt = `Изображение ${element.name}`

deleteCard.addEventListener('click', cardDelete) 

return placeTemplate
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const newCard = createCard(element, cardDelete) 
  cardPlaceList.append(newCard)
})

// @todo: Функция удаления карточки

function cardDelete(event) {
  let card = event.target.closest('.card')
  card.remove()
}

// Модальное окно