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

//кнопки открытия модального окна
const profilEeditBtn = document.querySelector('.profile__edit-button')
const profilEddBtn = document.querySelector('.profile__add-button')

//модальные окна
const profelPopupEdit = document.querySelector('.popup_type_edit')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')

//оверлэй
const modalWondow = document.querySelector('.popup')

//кнопка закрытия модального окна
const popupCloseBtn = document.querySelectorAll('.popup__close')

// Функция открытия модального окна
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleCloseEsc)
  document.addEventListener('click', modalWindowClose)
}

// Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleCloseEsc)
  document.removeEventListener('click', modalWindowClose)

}

// Обработчики открытия модалки
profilEeditBtn.addEventListener ('click', () => {
  openPopup(profelPopupEdit)
})

profilEddBtn.addEventListener ('click', () => {
  openPopup(popupTypeNewCard)
})

// Обработчик закрытия по кнопке (крестику)
popupCloseBtn.forEach(item => {
  item.addEventListener('click', () => {
    closePopup(profelPopupEdit);
    closePopup(popupTypeNewCard);
  });
});

//Функция закрытия Escape
const handleCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_is-opened')
    closePopup(popupActive)
  }
}

const modalWindowClose = (evt) => {
  if (evt.target === modalWondow) {
    closePopup(modalWondow)
  }
}



