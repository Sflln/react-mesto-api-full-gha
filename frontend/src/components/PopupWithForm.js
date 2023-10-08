import React from 'react';

function PopupWithForm({isOpen, onClose, name, title, children, submitForm, buttonName}) {
  return (
      <div className={`popup popup_type-${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__button-close" type="button" aria-label="Закрыть окно" onClick={onClose}/>
          <div className="popup__window">
            <h2 className="popup__title">{title}</h2>
            <form className={`popup__form popup__form_${name}`} name={`popupForm-${name}`} onSubmit={submitForm}>
              {children}
              <button type="submit" className="popup__button-save">{buttonName}</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default PopupWithForm;