import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, cardDelete, onLikeFnc } from '../components/card.js'
import { openPopup, closePopup } from '../components/modal.js'

const cardPlaceList = document.querySelector('.places__list')
const profilEeditBtn = document.querySelector('.profile__edit-button')
const profilEddBtn = document.querySelector('.profile__add-button')
const profelPopupEdit = document.querySelector('.popup_type_edit')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = document.querySelector('.popup__image')
const popupTypeImageCuption = document.querySelector('.popup__caption')
const popupCloseBtn = document.querySelectorAll('.popup__close')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const formElementEditProfile = document.forms['edit-profile']
const formNewCardElement = document.forms['new-place']
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardInpurUrl = document.querySelector('.popup__input_type_url')

// @todo: Вывести карточки на страницу

initialCards.forEach(function (element) {
  const newCard = createCard(element, cardDelete, onLikeFnc, openImageClick) 
  cardPlaceList.append(newCard)
})

//Функция открытия попапа с картинкой
function openImageClick(item) {
  popupImage.src = item.link
  popupImage.alt = item.name
  popupTypeImageCuption.textContent = item.name
  openPopup(popupTypeImage)
}

// Обработчик открытия модалки редактирования профиля
profilEeditBtn.addEventListener ('click', () => {
  openPopup(profelPopupEdit)

  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
})

// Функция «отправки» формы редактирования профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault(); 

  const inputName = nameInput.value
  const InputJob = jobInput.value

  profileTitle.textContent = inputName
  profileDescription.textContent = InputJob

  closePopup(profelPopupEdit)
}

formElementEditProfile.addEventListener('submit', handleFormSubmitProfile); 

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

  const newPopupCard = createCard(element, cardDelete, onLikeFnc, openImageClick)

  cardPlaceList.prepend(newPopupCard)
  closePopup(popupTypeNewCard)
  evt.target.reset()
}

formNewCardElement.addEventListener('submit', crateNewCard)

// Обработчик закрытия по кнопке (крестику)
popupCloseBtn.forEach(event => {
  const popup = event.closest('.popup')
  event.addEventListener('click', () => {
    closePopup(popup)
  })
});




