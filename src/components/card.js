const cardTemplate = document.querySelector('#card-template').content

// @todo: Функция создания карточки
function createCard(element, cardDelete, onLikeFnc, openImageClick, userId) {
  const placeTemplate = cardTemplate.querySelector('.places__item').cloneNode(true)
  
  const cardImage = placeTemplate.querySelector('.card__image')
  const cardTitle = placeTemplate.querySelector('.card__title')
  const deleteCard = placeTemplate.querySelector('.card__delete-button')
  const cardLikeBtn = placeTemplate .querySelector('.card__like-button')
  
  cardImage.src = element.link;
  cardTitle.textContent = element.name;
  cardImage.alt = `Изображение ${element.name}`
  
  cardImage.addEventListener('click', () => {
    openImageClick(element);
  });
  
  deleteCard.addEventListener('click', cardDelete) 
  cardLikeBtn.addEventListener('click', onLikeFnc)
  
  return placeTemplate
  }

// @todo: Функция удаления карточки

function cardDelete(event) {
  const card = event.target.closest('.card')
  card.remove()
}

//Функия лайка

function onLikeFnc(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

export {createCard, cardDelete, onLikeFnc}