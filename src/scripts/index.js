import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, cardDelete, onLikeFnc } from '../components/card.js'
import { openPopup, closePopup } from '../components/modal.js'
import { enableValidation, clearValidation } from '../components/validation.js'
import { getUserInfo, getInitialCards, editUserInfo, addNewCard, addNewAvatar } from '../components/api.js';

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
const profileImg = document.querySelector('.profile__image')
const formNewCardElement = document.forms['new-place']
const newCardSaveBtn = formNewCardElement.querySelector('.popup__button')
const formElementEditProfile = document.forms['edit-profile']
const editProfileSaveBtn = formElementEditProfile.querySelector('.popup__button')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardInpurUrl = document.querySelector('.popup__input_type_url')
//Аватар
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar')
const avatarOpenBtn = document.querySelector('.profile__image')
const avatarForm = popupChangeAvatar.querySelector('.popup__form')
const inputAvatarForm = avatarForm.querySelector('.popup__input_type_url')
const avatarSaveButton = avatarForm.querySelector('.popup__button')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-invalid',
  errorClass: 'popup__input-error_active'
}; 

enableValidation(validationConfig)


let userId;
// @todo: Вывести карточки на страницу
function getInfoUserAndCards () {
  return Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData] ) => {
  console.log({userData, cardsData})
  
  profileTitle.textContent =  userData.name;
  profileDescription.textContent = userData.about;
  profileImg.style.backgroundImage = `url(${userData.avatar})`;


  // const userId = userData._id
  userId = userData._id

  cardsData.forEach((element) => {
    const newCard = createCard(element, userId, cardDelete, onLikeFnc, openImageClick,) 
    cardPlaceList.append(newCard)
  }) 
  })
  .catch((err) => {
    console.log(err)
  })
}

getInfoUserAndCards()

//Функция открытия попапа с картинкой
function openImageClick(item) {
  popupImage.src = item.link
  popupImage.alt = item.name
  popupTypeImageCuption.textContent = item.name
  openPopup(popupTypeImage)
}

//Открытие попапа смены аватара
avatarOpenBtn.addEventListener('click', () => {
  openPopup(popupChangeAvatar)
  inputAvatarForm.value = ''
  clearValidation(popupChangeAvatar, validationConfig)
})

// Функция смены аватара
avatarForm.addEventListener('submit', () => {
  changeBtnText(avatarSaveButton, true)
  addNewAvatar(inputAvatarForm.value)
  .then((res) => {
    console.log(res)
    avatarOpenBtn.style.backgroundImage = `url(${res.avatar})`
    console.log(`url(${res.avatar})`)
    closePopup(popupChangeAvatar)
  })
  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    changeBtnText(avatarSaveButton, false)
  })
})

// Обработчик открытия модалки редактирования профиля
profilEeditBtn.addEventListener ('click', () => {
  openPopup(profelPopupEdit)
  clearValidation(profelPopupEdit, validationConfig);

  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
})

// Функция «отправки» формы редактирования профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault(); 

  changeBtnText(editProfileSaveBtn, true)
  editUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name
      profileDescription.textContent = data.about
      closePopup(profelPopupEdit)
    })

    .catch((err) => {
      console.log(err)
    })

    .finally(() => {
      changeBtnText(editProfileSaveBtn, false)
    })
}

formElementEditProfile.addEventListener('submit', handleFormSubmitProfile);

// Обработчик открытия модалки добавления карточки
profilEddBtn.addEventListener ('click', () => {
  openPopup(popupTypeNewCard)
  clearValidation(popupTypeNewCard, validationConfig);

})

// Функция «отправки» формы редактирования профиля

function crateNewCard (evt) {
  evt.preventDefault(); 
  changeBtnText(newCardSaveBtn, true)
  const element = {
    name: cardNameInput.value,
    link: cardInpurUrl.value,
  }

  addNewCard(element)
  .then((data) => {
    const newPopupCard = createCard(data, userId, cardDelete, onLikeFnc, openImageClick)
    console.log(data)

  cardPlaceList.prepend(newPopupCard)
  closePopup(popupTypeNewCard)
  evt.target.reset()
  })

  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    changeBtnText(newCardSaveBtn, false)
  })
}

formNewCardElement.addEventListener('submit', crateNewCard)

// Обработчик закрытия по кнопке (крестику)
popupCloseBtn.forEach(event => {
  const popup = event.closest('.popup')
  event.addEventListener('click', () => {
    closePopup(popup)
  })
});

//Функция смены статуса кнопки

function changeBtnText (buttonElement, status) {
  
  buttonElement.textContent = status ? 'Сохранение...' : 'Сохранить'
}


