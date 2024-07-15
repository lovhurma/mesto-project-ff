import '../pages/index.css';
import { initialCards } from './cards.js'


const cardTemplate = document.querySelector('#card-template').content
const cardPlaceList = document.querySelector('.places__list')
const likeBtn = document.querySelectorAll('.card__like-button')

//кнопки открытия модального окна
const profilEeditBtn = document.querySelector('.profile__edit-button')
const profilEddBtn = document.querySelector('.profile__add-button')

//модальные окна
const profelPopupEdit = document.querySelector('.popup_type_edit')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = document.querySelector('.popup__image')
const popupCuption = document.querySelector('.popup__caption')

//кнопка закрытия модального окна
const popupCloseBtn = document.querySelectorAll('.popup__close')

//Получение полей описания профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

// Находим форму в DOM
const formElement = document.forms['edit-profile']
const formNewCardElement = document.forms['new-place']
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardInpurUrl = document.querySelector('.popup__input_type_url')

// @todo: Функция создания карточки
function createCard(element, cardDelete, onLikeFnc, OpenImageClick) {
const placeTemplate = cardTemplate.querySelector('.places__item').cloneNode(true)

const cardImage = placeTemplate.querySelector('.card__image')
const cardTitle = placeTemplate.querySelector('.card__title')
const deleteCard = placeTemplate.querySelector('.card__delete-button')
const cardLikeBtn = placeTemplate .querySelector('.card__like-button')

cardImage.src = element.link;
cardTitle.textContent = element.name;
cardImage.alt = `Изображение ${element.name}`

cardImage.addEventListener('click', () => {
  OpenImageClick(element);
});

deleteCard.addEventListener('click', cardDelete) 
cardLikeBtn.addEventListener('click', onLikeFnc)

return placeTemplate
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const newCard = createCard(element, cardDelete, onLikeFnc, OpenImageClick) 
  cardPlaceList.append(newCard)
})

// @todo: Функция удаления карточки

function cardDelete(event) {
  let card = event.target.closest('.card')
  card.remove()
}

//Функия лайка

function onLikeFnc(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

//Функция открытия попапа с картинкой
function OpenImageClick(item) {
  popupImage.src = item.link
  popupImage.alt = item.name
  popupCuption.textContent = item.name
  openPopup(popupTypeImage)
}

// Функция открытия модального окна
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleCloseEsc)
  popup.addEventListener('click', modalWindowClose)
}

// Функция закрытия модального окна
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleCloseEsc)
  popup.removeEventListener('click', modalWindowClose)

}

// Обработчик открытия модалки редактирования профиля
profilEeditBtn.addEventListener ('click', () => {
  openPopup(profelPopupEdit)

  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
})

// Функция «отправки» формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const inputName = nameInput.value
  const InputJob = jobInput.value

  profileTitle.textContent = inputName
  profileDescription.textContent = InputJob

  closePopup(profelPopupEdit)
}

formElement.addEventListener('submit', handleFormSubmit); 

// Обработчик открытия модалки добавления карточки
profilEddBtn.addEventListener ('click', () => {
  openPopup(popupTypeNewCard)
})

// Функция «отправки» формы редактирования профиля

function crateNewCard (evt) {
  evt.preventDefault(); 

  const element = {
    name: cardNameInput.value,
    link: cardInpurUrl.value,
  }

  const newPopupCard = createCard(element, cardDelete, onLikeFnc, OpenImageClick)

  cardPlaceList.prepend(newPopupCard)
  closePopup(popupTypeNewCard)
  evt.target.reset()
}

formNewCardElement.addEventListener('submit', crateNewCard)

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
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};



