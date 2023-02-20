import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateTask, thunkLoadTasks, thunkUpdateTask, thunkDeleteTask } from '../../store/task';




function TasksComponent({ lists, currentList, setCurrentList }) {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task)
    const taskArray = Object.values(tasks)
    const [description, setDescription] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editingId, setEditingId] = useState(null);
    const [taskStatuses, setTaskStatuses] = useState(taskArray.reduce((acc, cur) => { acc[cur.id] = false; return acc; }, {}));
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            if (currentList) {
                const tasks = await dispatch(thunkLoadTasks(currentList.id))
                if (tasks.length >0) {
                    const taskStatuses = {}
                    tasks.forEach((task) => {
                        taskStatuses[task.id] = task.completionStatus
                    })
                    setTaskStatuses(taskStatuses)
                }
            } else {
                return null
            }
        }
        loadTasks()
    }, [dispatch, currentList])

    const createTask = async (e) => {
        e.preventDefault();
        let whitespace = /^\s*$/;
        if (description.length < 0 || whitespace.test(description)) {
            setErrors(["Cannot submit an empty task"])
            return
        };
        let task = await dispatch(thunkCreateTask({
            listId: currentList.id,
            description: description,
            completionStatus: false
        }))
        if (task) {
            setErrors([])
            setDescription('')
            setTaskStatuses({ ...taskStatuses, [task.id]: task.completionStatus })
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
            completionStatus: item.completionStatus
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

    const handleCheck = async (e, item) => {
        e.preventDefault();
        const updatedTask = {
            ...item,
            completionStatus: !taskStatuses[item.id]
        };
        setTaskStatuses({
            ...taskStatuses,
            [item.id]: !taskStatuses[item.id]
        });
        await dispatch(thunkUpdateTask(updatedTask));
    };

    if (currentList) {
        return (
            <div className='task container'>
                <div>{currentList.name} List Items</div>
                <div>{currentList && currentList.name}</div>
                {taskArray && taskArray.map((item) => {
                    if (item.id === editingId) {
                        return (
                            // UPDATE TASK
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
                                    checked={taskStatuses[item.id] || false}
                                    onChange={(e) => handleCheck(e, item)}
                                />
                                {item.description}
                                {/* DELETE TASK */}
                                <button type="submit" onClick={(e) => deleteTask(item.id)}>
                                    <i className="fa-solid fa-circle-minus"></i>
                                </button>
                                {/* UPDATE TASK BUTTON */}
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
