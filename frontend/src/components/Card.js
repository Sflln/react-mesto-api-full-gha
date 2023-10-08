import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `element__button-delete ${
    isOwn ? "element__button-delete_active" : ""
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  //Переменная для класса кнопки лайка
  const cardLikeButtonClassName = `element__button-like ${
    isLiked ? "element__button-like_active" : ""
  }`;
  function handleCardLike() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteCard}
        type="button"
        aria-label="удалить"
      />
      <img
        src={card.link}
        alt={card.name}
        className="element__img"
        onClick={handleClick}
      />
      <div className="element__unit">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__unit element__unit_like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="лайк"
            onClick={handleCardLike}
          />
          <p className="element__likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;