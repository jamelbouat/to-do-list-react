import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { ImSpinner, ImWarning } from 'react-icons/im';
import { BsPencilSquare } from 'react-icons/bs'
import { CustomDialog as ModalContainer } from 'react-st-modal';

import * as callApi from '../callApi';
import { Modal } from './Modal';

const Task = ({ task, onTaskUpdate, onDeleteTask }) => {
    const [error, setError] = useState(null);
    const [isTaskLoading, setTaskLoading] = useState(false);

    const handleTaskUpdate = async ({ ...updatedFields }) => {
        setError(null);
        setTaskLoading(true);
        const { error, updatedTask } = await callApi.updateTask({ id: task.id, ...updatedFields });
        if (error) {
            setError(error.message);
            setTaskLoading(false);
            return;
        }
        onTaskUpdate(updatedTask);
        setTaskLoading(false);
    };

    const handleDeleteTask = async () => {
        setTaskLoading(true);
        const { error, response } = await callApi.deleteTask(task.id);
        if (error) {
            setError(error.message);
            setTaskLoading(false);
            return;
        }
        if (response.status === 200){
            onDeleteTask(task.id);
        }
    };

    const handleOpenModal = async () => {
        setError(null);
        const result = await ModalContainer(
            <Modal
                prevTitle={ task.title }
                prevDescription={ task.description }
            />,
            {
                className: 'dialog-modal',
                isCanClose: false,
            }
        );

        result && await handleTaskUpdate(result);
    }

    return(
        <div className='task'>
            {
                isTaskLoading ?
                    <ImSpinner className='spinner'/> :
                    <>
                        <h3 className='overflow-block'>{ task.title }</h3>
                        <div className='overflow-block'>{ task.description }</div>
                        <FaTimes
                            className='close-icon'
                            title='Delete'
                            onClick={ handleDeleteTask }
                            disabled={true}
                        />
                        {
                            error &&
                            <ImWarning
                                className='warning-icon'
                                title='Task not updated'
                            />
                        }
                        <FaCheckCircle
                            className={ `done-icon ${ task.status ? 'task-done' : 'task-not-done' }` }
                            title='Make done'
                            onClick={ () => handleTaskUpdate({ status: !task.status }) }
                        />
                        <BsPencilSquare
                            className='pencil-icon'
                            title='Modify task'
                            onClick={ handleOpenModal }
                        />
                    </>
            }
        </div>
    )
};

export default Task;
