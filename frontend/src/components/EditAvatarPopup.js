import PopupWithForm from "./PopupWithForm";
import React, { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef();

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile-picture"
      title="Change profile picture"
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        id="input_type_url_photo"
        type="url"
        name="avatar"
        className="popup__input popup__input_type_avatar-link"
        placeholder="Image link"
        defaultValue=""
        ref={ref}
        required
      />

      <span id="input_type_url_photo-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
