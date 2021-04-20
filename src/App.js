import React, { useState, useEffect } from 'react';
import { ImSpinner } from 'react-icons/im';

import * as callApi from './callApi';
import Header from './components/Header';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';

import './styles.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isFormShown, setFormShow] = useState(false);
    const [isTasksLoading, setTasksLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const { error, fetchedTasks } = await callApi.getTasks();

        if (error) {
            setError(error.message);
            setTasksLoading(false);
            return;
        }
        setTasks([...fetchedTasks]);
        setTasksLoading(false);
    }

    const handleFormShow = () => {
        setFormShow(prev => !prev);
    }

    const handleTaskAdded = (newTask) => {
        setTasks(prev => [...prev, newTask]);
    }

    const handleTaskUpdate = (updatedTask) => {
        setTasks(
            tasks.map(task => {
                if (task.id === updatedTask.id) {
                    return { ...task, ...updatedTask };
                }
                return task;
            }));
    }

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className='container'>
            <Header handleFormShow={ handleFormShow } />

            {
                isFormShown && <AddTask onNewTaskAdd={ handleTaskAdded }/>
            }

            {
                isTasksLoading ?
                    <ImSpinner className='spinner'/> :
                    error ?
                        <h4 className='error'>{ error }</h4> :
                        <Tasks tasks={ tasks }
                               onTaskUpdate={ handleTaskUpdate }
                               onDeleteTask={ handleDeleteTask }
                        />
            }
        </div>
  );
}

export default App;
