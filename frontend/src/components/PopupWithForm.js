function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_is-open'}`}>
        <div className="popup__content">
          <button type="button" className="popup__close" onClick={props.onClose}></button>
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            {props.children}
            <button type="submit" className="popup__submit">{props.buttonText}</button>
          </form>
        </div>
      </div>
  );
}

export default PopupWithForm;
