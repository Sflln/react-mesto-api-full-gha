import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleUserName(e) {
    setName(e.target.value);
  }

  function handleUserDescription(e) {
    setDescription(e.target.value);
  }

  //Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit"
      submitForm={handleSubmit}
      title="Редактировать профиль"
      buttonName="Сохранить"
    >
      <input
        required
        id="name-input"
        onChange={handleUserName}
        value={name || ''}
        name="name"
        type="text"
        className="popup__input popup__input_form_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        required
        id="job-input"
        onChange={handleUserDescription}
        value={description || ''}
        name="about"
        type="text"
        className="popup__input popup__input_form_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
      />
      <span className="job-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;