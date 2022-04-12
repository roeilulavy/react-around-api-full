import successIcon from "../images/icon/success.svg";
import failIcon from "../images/icon/fail.svg";

function InfoTooltip(props) {
  const success = props.success;

  return (
    <div
      className={`popup popup_type_info-tooltip ${
        props.isOpen && "popup_is-open"
      }`}
    >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        {success ? (
            <img
              className="tooltip__image"
              src={successIcon}
              alt={"Success"}
            />
        ) : (
            <img
              className="tooltip__image"
              src={failIcon}
              alt={"Fail"}
            />
        )}
        <p className="tooltip__message">{props.message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
