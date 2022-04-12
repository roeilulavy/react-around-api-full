import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCard(cardName, cardLink);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-new-card"
      title="New Place"
      buttonText="Create"
      onSubmit={handleSubmit}
    >
      <input
        id="input_type_title"
        type="text"
        name="name"
        className="popup__input popup__input_type_card-name"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        autoComplete="off"
        required
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />

      <span id="input_type_title-error" className="popup__error" />

      <input
        id="input_type_url"
        type="url"
        name="link"
        className="popup__input popup__input_type_card-link"
        placeholder="Image link"
        required
        value={cardLink}
        onChange={(e) => setCardLink(e.target.value)}
      />

      <span id="input_type_url-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
