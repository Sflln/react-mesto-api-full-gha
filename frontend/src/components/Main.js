import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  loggedIn, 
  logout,
  userLoginData
}) 
{

  const currentUser = useContext(CurrentUserContext);


  return (
    <>
    <Header loggedIn={loggedIn}
              login={userLoginData}
              link="/sign-in"
              onClick={logout}
              text={'Выйти'}
      />
   
    <main className="main">
      <section className="profile">
        <div className="profile__union">
          <div className="profile__avatar-change">
            <img
              src={`${currentUser.avatar}`}
              alt="аватар"
              className="profile__avatar"
            />
            <button
              className="profile__button-avatar"
              type="button"
              aria-label="Изменить аватар пользователя"
              onClick={isEditAvatarPopupOpen}
            />
          </div>
          <div className="profile__info">
            <div className="profile__union profile__union_name">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                aria-label="Редактировать профиль"
                onClick={isEditProfilePopupOpen}
              />
            </div>
            <p className="profile__info-job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить карточку"
          onClick={isAddPlacePopupOpen}
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
    </>
  );
}

export default Main;
