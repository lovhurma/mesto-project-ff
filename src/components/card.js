const cardTemplate = document.querySelector('#card-template').content
import { removeCard, addLike, deleteLike } from './api.js'
import { openPopup, closePopup } from './modal.js'

// @todo: Функция создания карточки
function createCard(element, userId, cardDelete, onLikeFnc, openImageClick) {
  const placeTemplate = cardTemplate.querySelector('.places__item').cloneNode(true)
  
  const cardImage = placeTemplate.querySelector('.card__image')
  const cardTitle = placeTemplate.querySelector('.card__title')
  const deleteCard = placeTemplate.querySelector('.card__delete-button')
  const cardLikeBtn = placeTemplate .querySelector('.card__like-button')
  const likeCardContainer = placeTemplate.querySelector('.card__like-button-count')

  // console.log(element)
  const cardId = element._id;
  
  cardImage.src = element.link;
  cardTitle.textContent = element.name;
  cardImage.alt = `Изображение ${element.name}`;
  likeCardContainer.textContent = element.likes.length
  
  cardImage.addEventListener('click', () => {
    openImageClick(element);
  });

  if (element.likes.some((like) => like._id == userId)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  if (userId != element.owner._id) {
    deleteCard.remove();
  } else {
    deleteCard.addEventListener('click', () => {
      cardDelete(placeTemplate, cardId);
    });
  }

  cardLikeBtn.addEventListener('click', (evt) => {
    onLikeFnc(evt, cardId, likeCardContainer)
  })

  return placeTemplate
  }

// @todo: Функция удаления карточки

function cardDelete(element, cardId) {
  const removeCardPopup = document.querySelector('.popup_type_remove-card')

  openPopup(removeCardPopup);
  const removeButton = removeCardPopup.querySelector('.popup__button');

  removeButton.onclick = () => {
    removeCard(cardId)

    .then(() => {
      element.remove()
      closePopup(removeCardPopup)      
    })

    .catch((err) => {
      console.log(err)
    })
  }

}

//Функия лайка
function onLikeFnc(evt, cardId, likeCountainer) {

  const likeButton = evt.target;
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : addLike;
likeMethod(cardId) 
        .then((res) => {
          likeButton.classList.add('card__like-button_is-active') 
          likeCountainer.textContent = res.likes.length 
        })
.catch(err => console.log(err));

}

export {createCard, cardDelete, onLikeFnc}