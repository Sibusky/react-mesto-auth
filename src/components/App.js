import React, { useState, } from 'react';
import { CurrentUserContext, } from '../context/CurrentUserContext';
import { api } from '../utils/api.js'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
// import Login from './Login';
// import Register from './Register';
// import InfoTooltip from './InfoTooltip';

function App() {

  // Объявляю переменные состояния через хук useState
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // Получаю данные пользователя
  React.useEffect(() => {
    api.getProfile()
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }, [])

  // Функции для изменения состояния переменных (аватар, имя профиля, описание профиля, клинутая карточка)
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  // Функция закрытия всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  // Функция обновления данных пользователя после изменения
  const handleUpdateUser = ({ name, about }) => {
    api.editProfile(name, about)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция обновления аватара
  const handleUpdateAvatar = ({ avatar }) => {
    api.editAvatar(avatar)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Хук загрузки начальных карточек на страницу
  React.useEffect(() => {
    api.getInitialCards()
      .then((cardList) => {
        setCards(cardList)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }, []);

  // Функция для установки лайка
  function handleCardLike(card) {
    // Проверяю, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    // Отправляю запрос в API и получаю обновлённые данные карточки
    // Запись setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); равносильна записи:
    // setCards(cards.map((c) => c._id === card._id ? newCard : c));
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция для удаления карточек
  function handleCardDelete(card) {
    // Отправляю запрос на удаление карточки и получаю обновлённые данные о карточках
    api.deleteCard(card._id)
      .then(() => {
        // Методом filter() возвращаю массив без удалённой карточки
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  // Функция добавления новых карточек
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>

      <div className="page">

        <Header />

        {/* <Login /> */}

        {/* <Register /> */}
        
        {/* <InfoTooltip /> */}

        <Main onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />

        <Footer />

        {/* Попап загрузки аватара */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        {/* Попап изменения данных профиля */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/* Попап добавления новой карточки */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        {/* Попап открытия изображения карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;