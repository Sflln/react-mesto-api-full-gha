import React from 'react';

function ImagePopup({ card, onClose }) {
  return (

    <div className={`popup popup_type-img ${card ? "popup_opened" : null}`}>
      <div className="popup__container popup__container_img">
        <button className="popup__button-close popup__button-close_img" type="button" aria-label="Закрыть окно" onClick={onClose}></button>
        <img src={card?.link} className="popup__img" alt={card?.name}/>
        <h1 className="popup__text">{card?.name}</h1>
      </div>
    </div>
  );
}

export default ImagePopup;