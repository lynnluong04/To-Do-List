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
        type: LOAD_LISTS,
        list
    }
}
const actionUpdateList = (list) => {
    return {
        type: LOAD_LISTS,
        list
    }
}
const actionDeleteList = (list) => {
    return {
        type: LOAD_LISTS,
        list
    }
}

export const thunkLoadLists = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/${userId}`);

    if (response.ok) {
        const lists = await response.json();
        // console.log("LIST FROM THUNK")
        // console.log(lists)
        dispatch(actionLoadLists(lists));
        return response;
    } else {
        return response.json()
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
        default:
            return state;
    }
}

export default listReducer;
