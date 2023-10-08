import React, { useRef, useEffect} from "react";
// import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef("");
  // const [avatar, setAvatar] = useState("");
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])



  //Обработчик сабмита формы 
  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="avatar"
      buttonName="Сохранить"
      submitForm={handleSubmit}
    >
      <input
        className="popup__input popup__input_form_avatar"
        type="url"
        name="link"
        required
        placeholder="Ссылка на фотографию"
        ref={avatarRef}
      />
      <span
        id="avatar-error"
        className="avatar-input-error popup__input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;