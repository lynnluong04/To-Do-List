import { csrfFetch } from "./csrf";

const LOAD_TASKS = 'tasks/loadTasks'
const CREATE_TASK = 'tasks/createTask'
const UPDATE_TASK = 'tasks/updateTask'
const DELETE_TASK = 'tasks/deleteTask'

const actionLoadTasks = (tasks) => {
    return {
        type: LOAD_TASKS,
        tasks
    }
}
const actionCreateTask = (task) => {
    return {
        type: CREATE_TASK,
        task
    }
}
const actionUpdateTask= (task) => {
    return {
        type: UPDATE_TASK,
        task
    }
}
const actionDeleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId
    }
}

export const thunkLoadTasks = (listId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/lists/${listId}`);

    if (response.ok) {
        const tasks = await response.json();
        dispatch(actionLoadTasks(tasks));
        return response;
    } else {
        return response.json()
    }
}

export const thunkCreateTask= (taskData) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/lists/${taskData.listId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    if (response.ok) {
        const task = await response.json()
        dispatch(actionCreateTask(task))
        return task;
    }

}

export const thunkUpdateTask = (taskData) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${taskData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: taskData.id,
            description:taskData.description,
            completionStatus: taskData.completionStatus})
    })


    if (response.ok) {
        const task = await response.json()
        dispatch(actionUpdateTask(task))
        return task;
    }
}

export const thunkDeleteTask = (taskId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const taskId = await response.json()
        dispatch(actionDeleteTask(taskId))
        return taskId
    }
}

const taskReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_TASKS:
            const newState1 = {}
            action.tasks.forEach((item)=>{
                newState1[item.id] = item
            });
            return newState1;

        case CREATE_TASK:
            const newState2 = {...state}
            newState2[action.task.id] = action.task
            return newState2

        case UPDATE_TASK:
            const newState3 = {...state}
            newState3[action.task.id] = action.task
            return newState3

        case DELETE_TASK:
            const newState4 = {...state}
            delete newState4[action.taskId]
            return newState4

        default:
            return state;
    }
}

export default taskReducer;
