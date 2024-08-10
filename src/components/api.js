//Функция запроса с повторящимися данными
const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'f0d26107-266f-4fd0-85c6-5c47e5f467f1',
    'Content-Type': 'application/json'
  }
}

//Функция обработки response
const handleResponse = (res) => {
  if(res.ok){
    return res.json()
  }

  return Promise.reject(`Ошибка: ${res.status}`)
}

//Получаю информацию о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
}

//Получаю карточки
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
}

//Редактирование профиля (отправка данных на сервер)
export const editUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })

  .then(handleResponse)
}