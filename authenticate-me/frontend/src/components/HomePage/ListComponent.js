import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLoadLists } from '../../store/list';

function ListsComponent() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const lists = useSelector(state => state.list)
    const listArray = Object.values(lists)
    useEffect(()=> {
        dispatch(thunkLoadLists(sessionUser?.id))
    }, [dispatch])

    console.log(lists)

    return (
        <div>
        {listArray && listArray.map((item) => {
            return (
                <div>{item.name}</div>
            )
        })}
        </div>

    )
}

export default ListsComponent;
