import { validationConfig } from '../scripts/index.js'

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

  //Функция отключения кнопки(повторяющаяся)

  const disableSubmitButton = (button, config) => {
    button.disabled = config;
    button.classList.add(validationConfig.inactiveButtonClass)
  }

  //
  
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement, true)
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
  
  export const enableValidation = (validationConfig) => {
  
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })
  
      setEventListeners(formElement, validationConfig)
    })
  }

  
  export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig)
    })
    disableSubmitButton(buttonElement, true)
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  }