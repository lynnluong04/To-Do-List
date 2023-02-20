import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleDemoUser = async (e) => {
    e.preventDefault()
    const user = {
      credential: "Demo-User",
      password: "password"
    }
    await dispatch(sessionActions.login(user))
    history.push('/home')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup form container'>
      <form className="signup" onSubmit={handleSubmit}>
        <div id="signup-title">Sign Up for an Account</div>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="signup">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup"
        />
        <label className="signup">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="signup"
        />
        <label className="signup">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup"
        />
        <label className="signup">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="signup"
        />
        <button type="submit" className="signup">Sign Up</button>
        <button className="demo" type="button" onClick={handleDemoUser}>Demo User Login</button>
        <div id="login-link">
          <div>Already have an account?</div>
          <NavLink to={"/"} className="signup">Log in here</NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
