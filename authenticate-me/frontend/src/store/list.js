import { csrfFetch } from "./csrf";

const LOAD_LISTS = 'lists/loadLists'
const CREATE_LIST = 'lists/createList'
const UPDATE_LIST = 'lists/updateList'
const DELETE_LIST = 'lists/deleteList'

const actionLoadLists = (lists) => {
    return {
        type: LOAD_LISTS,
        lists
    }
}
const actionCreateList = (list) => {
    return {
        type: CREATE_LIST,
        list
    }
}
const actionUpdateList = (list) => {
    return {
        type: UPDATE_LIST,
        list
    }
}
const actionDeleteList = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
}

export const thunkLoadLists = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/user/${userId}`);

    if (response.ok) {
        const lists = await response.json();
        dispatch(actionLoadLists(lists));
        return response;
    } else {
        return response.json()
    }
}

export const thunkCreateList = (listData) => async (dispatch) => {
    console.log("LIST FROM CREATE THUNK")
    console.log(listData)
    const response = await csrfFetch(`/api/lists/user/${Number(listData.userId)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listData)
    });

    if (response.ok) {
        const list = await response.json()
        dispatch(actionCreateList(list))
        return list;
    }

}

export const thunkDeleteList = (listId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/lists/${listId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const listId = await response.json()
        dispatch(actionDeleteList(listId))
        return listId
    }
}

const listReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_LISTS:
            const newState1 = {}
            action.lists.forEach((item)=>{
                newState1[item.id] = item
            });
            return newState1;

        case CREATE_LIST:
            const newState2 = {...state}
            newState2[action.list.id] = action.list
            return newState2

        case DELETE_LIST:
            console.log("STATE RIGHT NOW", state, action.listId)
            const newState4 = {...state}
            delete newState4[action.listId]
            return newState4

        default:
            return state;
    }
}

export default listReducer;
