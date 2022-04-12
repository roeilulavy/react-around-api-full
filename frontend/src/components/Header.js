import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo/logo.svg";
import menuIcon from "../images/icon/menu.svg";
import closeIcon from "../images/icon/Close Icon.svg";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  function onLogout() {
    props.onLogout();
  }

  return (
    <header className="header">
      {props.page === 'signin' && (
        <div className="header__logo-container">
          <img className="header__logo" src={logo} alt="Around the U.S logo" />
          <Link to={"/signup"} className="header__link">Sign up</Link>
        </div>
      )}
      {props.page === 'signup' && (
        <div className="header__logo-container">
          <img className="header__logo" src={logo} alt="Around the U.S logo" />
          <Link to={"/signin"} className="header__link">Sign in</Link>
        </div>
      )}
      {props.page === 'home' && (
        <>
          <div className="header__logo-container">
            <img className="header__logo" src={logo} alt="Around the U.S logo" />
            <img className="header__container-button" src={isOpen ? closeIcon : menuIcon} onClick={() => setIsOpen(!isOpen)} alt="menu" />
          </div>

          <div className={isOpen ? "header__user-container_active" : "header__user-container"} >
            <p className="header__id">{props.email}</p>
            <button className="header__button" onClick={onLogout}>Log out</button>
          </div>
          
        </>
      )}
    </header>
  );
}

export default Header;
