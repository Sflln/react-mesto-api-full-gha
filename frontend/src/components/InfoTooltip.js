import React from "react";
import success from "../images/success.png"
import error from "../images/error.png"

function InfoTooltip({ isOpen, onClose, isRegSuccess, regFailed, regSuccess }) {
    return(
        <div className={`popup ${isOpen && 'popup_opened'}`}>
          <div className="popup__container popup__container_auth">
            <button type="button"
                    className="popup__button-close"
                    onClick={onClose}
            />
            <img className="popup__img-auth"
                 src={`${isRegSuccess ? success : error}`}
                 alt="Изображение статуса регистрации"
            />
            <p className="popup__text-auth">
              {`${isRegSuccess ? regSuccess : regFailed}`}
            </p>
          </div>
        </div>
    );
  }
  
  export default InfoTooltip;