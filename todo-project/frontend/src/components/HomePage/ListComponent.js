import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateList, thunkUpdateList, thunkDeleteList, thunkLoadLists } from '../../store/list';

function ListsComponent({ lists, setCurrentList }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [listName, setListName] = useState('');
    const [editListName, setEditListName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState([]);

    const createList = async (e) => {
        e.preventDefault();
        let whitespace = /^\s*$/;
        if (listName.length < 0 || whitespace.test(listName)) {
            return errors.push("Cannot submit an empty list")
        };

        let list = await dispatch(thunkCreateList({
            userId: sessionUser?.id,
            name: listName
        }));

        if (list) {
            setErrors([])
            setListName('')
        };
    };

    const updateList = async (e, item) => {
        e.preventDefault();

        let whitespace = /^\s*$/;
        if (editListName.length < 0 || whitespace.test(editListName)) {
            return errors.push("Cannot submit an empty list")
        };
        const listData = {
            id: item.id,
            name: editListName
        }

        let list = await dispatch(thunkUpdateList(listData));

        if (list) {
            setErrors([])
            setEditListName('')
            setEditingId(null)
        };
    };

    const deleteList = async (listId) => {
        await dispatch(thunkDeleteList(listId));
    };

    const openEditForm = (item) => {
        setEditingId(item.id)
        setEditListName(item.name)
    }

    const closeEditForm = () => {
        setEditingId(null)
        setEditListName('')
    }


    return (
        <div>
            {/* CREATE LIST */}
            <div>Add New List</div>
            <form onSubmit={createList}>
                <label>Name</label>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    required
                />
                <button type="submit">
                    <i className="fa-solid fa-circle-plus"></i>
                </button>

            </form>

            {lists && lists.map((item) => {
                if (item.id === editingId) {
                    return (
                        <div key={item.id}>
                            {/* CREATE LIST ITEM */}
                            <form onSubmit={(e) => updateList(e, item)}>
                                <input
                                    type='text'
                                    value={editListName}
                                    onChange={(e) => setEditListName(e.target.value)}
                                    required
                                />
                                <button type="submit">
                                    <i className="fa-regular fa-circle-check"></i>
                                </button>
                                <button type="button" onClick={() => closeEditForm()}>
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </button>
                            </form>
                        </div>
                    )
                } else {
                    return (
                        <div key={item.id}>
                            {/* LIST ITEM */}
                            <div onClick={() => setCurrentList(item)}>{item.name}</div>
                            {/* DELETE LIST */}
                            <button type='submit' onClick={(e) => deleteList(item.id)}>
                                <i className="fa-solid fa-circle-minus"></i>
                            </button>
                            {/* UPDATE LIST */}
                            <button onClick={() => openEditForm(item)}>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                        </div>
                    )
                }
            })}

        </div>
    )
}

export default ListsComponent;
