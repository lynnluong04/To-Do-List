import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';



function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);


    console.log(sessionUser)
    const logout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push('/')
      };

    return (
        <div>
            <div>{sessionUser?.username}'s To Do Lists</div>
            <button onClick={logout}>Log Out</button>
        </div>
    )
};

export default HomePage
