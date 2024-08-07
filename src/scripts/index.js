import '../pages/index.css';
import { initialCards } from './cards.js'
import { createCard, cardDelete, onLikeFnc } from '../components/card.js'
import { openPopup, closePopup } from '../components/modal.js'
// import { enableValidation, validationConfig, clearValidation } from '../components/validation.js'

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

//validation

// //Функция добавления ошибки

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
const nameInputError = formElement.querySelector(`.${inputElement.id}-error`)
inputElement.classList.add(validationConfig.inputErrorClass)
  nameInputError.textContent = errorMessage
  nameInputError.classList.add(validationConfig.errorClass)
}

const hideInputError = (formElement, inputElement, validationConfig) => {
const nameInputError = formElement.querySelector(`.${inputElement.id}-error`)
inputElement.classList.remove(validationConfig.inputErrorClass)
  nameInputError.classList.remove(validationConfig.errorClass)
  nameInputError.textContent = ''
}

const isValid = (formElement,  inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("")
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig)
  } else {
    hideInputError(formElement, inputElement, validationConfig)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)    
  }
}

function setEventListeners (formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

const enableValidation = (validationConfig) => {

  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })

    setEventListeners(formElement, validationConfig)
  })
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-invalid',
  errorClass: 'popup__input-error_active'
}; 

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  inputList.forEach((inputElement) => {
    hideInputError(ormElement, inputElement, validationConfig)
  })
  
  buttonElement.disabled = true
  buttonElement.classList.add(validationConfig.inactiveButtonClass)
}

enableValidation(validationConfig)

clearValidation(formElement, validationConfig);

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




