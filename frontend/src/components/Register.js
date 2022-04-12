import React, { useState } from "react";
import { Link } from "react-router-dom";


const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onRegister(email, password);
  };

  return (
    <div className="register">
      <p className="register__header">Sign up</p>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="register__button">
          Sign up
        </button>
      </form>
      <p className="register__signin">
        Already a member?{" "}
        <Link to="signin" className="register__link">
          Log in here!
        </Link>
      </p>
    </div>
  );
};

export default Register;
