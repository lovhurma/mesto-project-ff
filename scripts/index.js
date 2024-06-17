// @todo: Темплейт карточки

const cardContainer = document.querySelector('.places__item')
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const cardPlaceList = document.querySelector('.places__list')

// @todo: Функция создания карточки

function createCard(element, cardDelete) {
const placeTemplate = cardTemplate.querySelector('.places__item').cloneNode(true)

const cardImage = placeTemplate.querySelector('.card__image')
const cardTitle = placeTemplate.querySelector('.card__title')
const deleteCard = placeTemplate.querySelector('.card__delete-button')

cardImage.src = element.link;
cardTitle.textContent = element.name;

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
