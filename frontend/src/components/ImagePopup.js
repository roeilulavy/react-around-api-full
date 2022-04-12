function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image-preview ${props.isOpen && 'popup_is-open'}`}>
      <div className="popup__content-wrapper">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <img className="popup__image" src={props.selectedCard.link} alt={props.selectedCard.name} />
        <figure className="popup__figure">{`${props.selectedCard.name}`}</figure>
      </div>
    </div>
  );
}

export default ImagePopup;