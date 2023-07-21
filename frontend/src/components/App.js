import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { FormValidator } from '../utils/FormValidator';
import { api } from '../utils/api';
import * as auth from '../utils/api-auth';
import { renderLoading } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [tooltipPopupType, setTooltipPopupType] = useState('error');

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [formValidators, setFormValidators] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  };

  const navigate = useNavigate();

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setEmail(res.data.email)
          loadInitialAppData();
          navigate("/", { replace: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const handleLogin = () => {
    setLoggedIn(true);
    loadInitialAppData();
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser({});
    setEmail('');
  };

  useEffect(() => {
    handleTokenCheck();
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      setFormValidators((prevState) => {
        return {
          ...prevState,
          [formName]: validator
        }
      })
      validator.enableValidation();
    });
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  function handleEditAvatarClick() {
    formValidators['avatar-edit'].disableSubmitButton();
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    formValidators['profile-edit'].disableSubmitButton();
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    formValidators['add-card'].disableSubmitButton();
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);

    api.changeLikeState(card._id, isLiked)
      .then(newCard => {
        setCards(prevState =>
          prevState.map(prevCard =>
            prevCard._id === card._id ? newCard : prevCard
          )
        );
      })
      .catch(error => {
        console.log(`Ошибка клика по лайку: ${error}`)
      });
  };

  function handleCardDelete(deletedCardId) {
    api.deleteCard(deletedCardId)
      .then(() => {
        setCards(prevState =>
          prevState.filter(prevCard => prevCard._id !== deletedCardId)
        )
      })
      .catch(err =>
        console.log(`Ошибка удаления карточки: ${err}`)
      )
  };

  function handleUpdateUser(newUserData) {
    renderLoading('.form_profile-edit', true);
    api.setUserInfo(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления информации о пользователе: ${err}`)
      )
      .finally(() => {
        renderLoading('.form_profile-edit', false);
      })
  };

  function handleUpdateAvatar(newUserAvatar) {
    renderLoading('.form_avatar-edit', true);
    api.setUserAvatar(newUserAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления аватара пользователя: ${err}`)
      )
      .finally(() => {
        renderLoading('.form_avatar-edit', false);
      })
  };

  function handleAddPlaceSubmit(newPlace) {
    renderLoading('.form_add-card', true);
    api.addNewCard(newPlace)
      .then((newCard) => {
        setCards(prevState => [newCard, ...prevState]);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка загрузки новой карточки: ${err}`)
      )
      .finally(() => {
        renderLoading('.form_add-card', false);
      })
  };

  function loadInitialAppData() {
    api.getStartAppData()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData.data);
        setCards(initialCards);
      })
      .catch(err =>
        console.log(`Ошибка загрузки данных о пользоателе: ${err}`)
      )
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    handleLogout();
  };

  const onRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setIsTooltipPopupOpen(true);
        setTooltipPopupType('success');
        navigate('/login', { replace: true });
      })
      .catch(() => {
        setIsTooltipPopupOpen(true);
        setTooltipPopupType('error');
      })
  }

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email)
          localStorage.setItem('jwt', data.token);
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch(() => {
        setIsTooltipPopupOpen(true);
        setTooltipPopupType('error');
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header loggedIn={loggedIn} onSignOut={onSignOut} email={email} />

        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={onRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={onLogin}
              />
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip isOpen={isTooltipPopupOpen} onClose={closeAllPopups} tooltipType={tooltipPopupType} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
          submitButtonText={'Да'}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
