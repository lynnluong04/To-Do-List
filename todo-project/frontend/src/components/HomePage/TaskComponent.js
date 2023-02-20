import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateTask, thunkLoadTasks, thunkUpdateTask, thunkDeleteTask } from '../../store/task';




function TasksComponent({ lists, currentList }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const tasks = useSelector(state => state.task)
    const taskArray = Object.values(tasks)
    console.log("WHAT ARE THESE", taskArray)
    const [description, setDescription] = useState('')
    const [checkTodo, setCheckTodo] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [status, setStatus] = useState(false)
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentList) dispatch(thunkLoadTasks(currentList.id))
    }, [dispatch, currentList])

    const createTask = async (e) => {
        e.preventDefault();
        let whitespace = /^\s*$/;
        if (description.length < 0 || whitespace.test(description)) {
            return errors.push("Cannot submit an empty task")
        };
        let task = await dispatch(thunkCreateTask({
            listId: currentList.id,
            description: description,
            completionStatus: status
        }))
        if (task) {
            setErrors([])
            setDescription('')
        }
    }

    // const checkTodo = async (e) => {
    //     e.preventDefault()
    // }

    return (
        <div>
            <div>LIST ITEMS</div>
            <div>{currentList && currentList.name}</div>
            {taskArray && taskArray.map((item) => {
                return (
                    <div key={item.id}>
                        <input
                            type='checkbox'
                        />
                        {item.description}

                    </div>
                )
            })}

            <form onSubmit={createTask}>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder='Add a new task '
                />
                <button type="submit">
                    <i className="fa-solid fa-circle-plus"></i>
                </button>
            </form>

        </div>
    )
}

export default TasksComponent;
