import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateTask, thunkLoadTasks, thunkUpdateTask, thunkDeleteTask } from '../../store/task';




function TasksComponent({ lists, currentList, setCurrentList }) {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task)
    const taskArray = Object.values(tasks)
    const [description, setDescription] = useState('')
    const [checkTodo, setCheckTodo] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editingId, setEditingId] = useState(null);
    const [status, setStatus] = useState(false)
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

    const updateTask = async (e, item) => {
        e.preventDefault();
        let whitespace = /^\s*$/;

        if (editDescription.length < 0 || whitespace.test(editDescription)) {
            return errors.push("Cannot submit an empty task")
        };

        const taskData = {
            id: item.id,
            description: editDescription,
            completionStatus: status
        }
        let task = await dispatch(thunkUpdateTask(taskData))
        if (task) {
            setErrors([])
            setEditDescription('')
            setEditingId(null)
        }
    }

    const openEditTask = (item) => {
        setEditingId(item.id)
        setEditDescription(item.description)
    }
    const closeEditTask = () => {
        setEditingId(null)
        setEditDescription('')
    }

    const deleteTask = async (taskId) => {
        await dispatch(thunkDeleteTask(taskId))
    }

    // const checkTodo = async (e) => {
    //     e.preventDefault()
    // }
    if (currentList) {
        return (
            <div>
                <div>LIST ITEMS</div>
                <div>{currentList && currentList.name}</div>
                {taskArray && taskArray.map((item) => {
                    if (item.id === editingId) {
                        return (
                            <div key={item.id}>
                                <form onSubmit={(e) => updateTask(e, item)}>
                                    <input
                                        type='text'
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        required
                                    />
                                    <button type="submit">
                                        <i className="fa-regular fa-circle-check"></i>
                                    </button>
                                    <button type="button" onClick={() => closeEditTask()}>
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    </button>
                                </form>
                            </div>
                        )
                    } else {
                        return (
                            <div key={item.id}>
                                <input
                                    type='checkbox'
                                />
                                {item.description}
                                {/* DELETE TASK */}
                                <button type="submit" onClick={(e) => deleteTask(item.id)}>
                                    <i className="fa-solid fa-circle-minus"></i>
                                </button>
                                {/* UPDATE TASK */}
                                <button onClick={() => openEditTask(item)}>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                            </div>
                        )
                    }
                })}
                {/* CREATE TASK */}

                {currentList &&
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
                }
            </div>
        )
    }
}

export default TasksComponent;
