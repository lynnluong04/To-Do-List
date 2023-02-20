import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateList, thunkUpdateList, thunkDeleteList, thunkLoadLists } from '../../store/list';

function ListsComponent({ lists, setCurrentList, currentList }) {
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
    console.log(currentList)



    return (
        <div className='list container'>
            {/* CREATE LIST */}
            {/* <div className='add-list'>Add New List</div> */}
            <form onSubmit={createList} className='add-list'>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    required
                    className='add-list'
                    placeholder='Add New List...'
                />
                <button type="submit" className='add-list'>
                    <i className="fa-solid fa-circle-plus"></i>
                </button>

            </form>

            {lists && lists.map((item) => {
                if (item.id === editingId) {
                    return (
                        <div key={item.id}>
                            {/* UPDATE LIST ITEM */}
                            <form onSubmit={(e) => updateList(e, item)}>
                                <input
                                    type='text'
                                    value={editListName}
                                    onChange={(e) => setEditListName(e.target.value)}
                                    required
                                    className='update-list-item'
                                />
                                <button type="submit" className='submit-update' >
                                    <i class="fa-solid fa-circle-check"></i>
                                </button>
                                <button type="button" className='close-update' onClick={() => closeEditForm()} >
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </button>
                            </form>
                        </div>
                    )
                } else {
                    return (
                        <div key={item.id} className="list item container">
                            {/* LIST ITEM */}
                            <div onClick={() => setCurrentList(item)} className={currentList === item ? "selected-item" : "list-item"} >{item.name}</div>

                            <div className='list options'>
                                {/* UPDATE LIST */}
                                <button type="button" className={currentList === item ? "update list" : "hide"} onClick={() => openEditForm(item)}>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>

                                {/* DELETE LIST */}
                                <button type='button' className={currentList === item ? "delete list" : "hide"} onClick={(e) => deleteList(item.id)}>
                                    <i className="fa-solid fa-circle-minus"></i>
                                </button>
                            </div>
                        </div>
                    )
                }
            })}

        </div>
    )
}

export default ListsComponent;
