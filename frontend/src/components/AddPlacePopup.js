import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink,
    });
  }

  function handleCardTitle(event) {
    setCardTitle(event.target.value);
  }

  function handleCardLink(event) {
    setCardLink(event.target.value);
  }

  

  useEffect(() => {
    setCardLink("");
    setCardTitle("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="cards"
      buttonName="Создать"
      submitForm={handleSubmit}
    >
      <input
        required
        id="title-input"
        name="name"
        type="text"
        className="popup__input popup__input_form_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleCardTitle}
        value={cardTitle ? cardTitle : ""}
      />
      <span className="title-input-error popup__input-error"></span>
      <input
        id="link-input"
        required
        name="link"
        type="url"
        className="popup__input popup__input_form_link"
        placeholder="Ссылка на картинку"
        onChange={handleCardLink}
        value={cardLink ? cardLink : ""}
      />
      <span className="link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
