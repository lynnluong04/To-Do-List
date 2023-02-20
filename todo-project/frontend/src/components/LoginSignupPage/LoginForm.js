import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';


function LoginFormPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/home" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='login form container'>
            <form className='login' onSubmit={handleSubmit}>
                <div id="login-title"> Log in to your account</div>
                <ul className='login errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className='login'>
                    Username or Email
                </label>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    className='login'
                />
                <label className='login'>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='login'
                />
                <button className='login' type="submit">Log In</button>
                <div id="signup-link">
                <div className='login'>Don't have an account?</div>
                <NavLink to={"/signup"} className='login'>Sign up here</NavLink>
                </div>
            </form>

        </div>
    );
}

export default LoginFormPage;
