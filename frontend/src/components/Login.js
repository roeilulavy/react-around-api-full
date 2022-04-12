import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  return (
    <div className="login">
      <p className="login__header">Log in</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="login__button"
        >
          Log in
        </button>
      </form>
      <p className="login__signup">
        Not a member yet?{" "}
        <Link to="/signup" className="login__link">
          Sign up here!
        </Link>
      </p>
    </div>
  );
}

export default Login;
