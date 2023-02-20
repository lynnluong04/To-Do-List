import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import ListsComponent from './ListComponent';
import { thunkLoadLists } from '../../store/list';
import TasksComponent from './TaskComponent';



function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const lists = useSelector(state => state.list);
    const listArray = Object.values(lists);
    const [currentList, setCurrentList] = useState(null)

    useEffect(() => {
        dispatch(thunkLoadLists(sessionUser?.id))
    }, [dispatch]);


    const logout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push('/')
      };

    return (
        <div>
            <div>{sessionUser?.username}'s To Do Lists</div>
            <ListsComponent lists={listArray} currentList={currentList} setCurrentList={setCurrentList}/>
            <TasksComponent lists={listArray} currentList={currentList}/>
            <button onClick={logout}>Log Out</button>
        </div>
    )
};

export default HomePage
