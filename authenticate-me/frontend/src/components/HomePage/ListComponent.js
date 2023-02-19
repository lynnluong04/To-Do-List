import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateList, thunkLoadLists } from '../../store/list';

function ListsComponent() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const lists = useSelector(state => state.list)
    const listArray = Object.values(lists)
    const [listName, setListName] = useState('')
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(thunkLoadLists(sessionUser?.id))
    }, [dispatch])

    const createList = async(e) => {
        e.preventDefault();
        let whitespace = /^\s*$/
        if (listName.length < 0 || whitespace.test(listName)) {
            return errors.push("Cannot submit an empty list")
        }

        let list = await dispatch(thunkCreateList({
            userId: sessionUser?.id,
            name: listName
        }))

        if (list) {
            setErrors([])
            setListName('')
        }
    }


    return (
        <div>
            {listArray && listArray.map((item) => {
                return (
                    <div>{item.name}</div>
                )
            })}

            <div>Add New List</div>
            <form onSubmit={createList}>
                <label>Name</label>
                <input
                    type="text"
                    value={listName}
                    onChange={(e)=> setListName(e.target.value)}
                    required
                />
                <button type="submit">
                    <i class="fa-solid fa-circle-plus"></i>
                </button>
            </form>
        </div>
    )
}

export default ListsComponent;
