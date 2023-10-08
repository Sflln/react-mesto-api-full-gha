import React, { useState, useEffect } from "react";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Routes, useNavigate} from 'react-router-dom';
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
// import { register, login, getData } from '../utils/auth.js';
import * as auth from "../utils/auth.js";



function App() {
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const [userLoginData, setUserLoginData] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('1');
      return;
    }

    api.setToken(token);
    api.getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user.data);
        setCards(cards.data);
      })
      .catch((err) => console.log(err));
  }, [loggedIn])


  function openTooltip() {
    setIsTooltipOpened(!isTooltipOpened);
  }


  function closeTooltip() {
    setIsTooltipOpened(false);
    if (isAuth) {
      navigate('/sign-in');
    }
  }


  function handleCardClick(props) {
    setSelectedCard(props);
  }


  function handleUpdateUser(user) {
    api
      .saveUserChanges(user.name, user.about)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsTooltipOpened(false);
    setSelectedCard(null);
  }

  function handleUpdateAvatar(user) {
    api
      .changedAvatar(user.avatar)
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  

  function handleRegister (data) {
    const { email, password } = data;
    return auth.register(email, password)
      .then((res) => {
        if (res.data) { //было res.data
          setIsAuth(true);
          setIsTooltipOpened(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setIsAuth(false);
        openTooltip();
        console.log(`Произошла ошибка: ${err}`);
        navigate('/sign-up');
      });
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    setUserLoginData(email);
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setIsAuth(true);
          navigate('/');
        }
      })
      .catch((err) => {
        setIsAuth(false);
        setIsTooltipOpened(true);
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      auth.getData(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserLoginData(res.data.email);
          }
        })
        .catch((err) => {
          setIsTooltipOpened(true);
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [navigate, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [navigate, loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsAuth(false);
    navigate('/sign-in');
  };

  //Функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard);
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  //Функция удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  //Функция добавления карточки
  function handleAddPlace(card) {
    api
      .postNewCard(card.name, card.link)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}
            element={Main}
            isEditAvatarPopupOpen={handleEditAvatarClick}
            isEditProfilePopupOpen={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            logout={handleLogout}
            userLoginData={userLoginData}/>}/>
          <Route path="/sign-in"  element={<Login handleLogin={handleLogin}/>}></Route>
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />}></Route>
        </Routes>
        <Footer />

        <InfoTooltip 
          isOpen={isTooltipOpened} 
          onClose={closeTooltip} 
          isRegSuccess={isAuth} 
          regSuccess="Вы успешно зарегестрировались!"
          regFailed="Что-то пошло не так! Попробуйте ещё раз."
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm-delete"
          title="Вы уверены?"
          buttonName="Да"
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;