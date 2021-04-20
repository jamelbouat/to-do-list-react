import React, { useState } from 'react';
import * as callApi from '../callApi';

import '../styles.css';

const AddTask = ({ onNewTaskAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setError(null);
        e.target.name === 'title' ?
            setTitle(e.target.value) :
            setDescription(e.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            setError('Error: empty fields');
            return;
        }
        const { error, addedTask } = await callApi.addTask({ title: title.trim(), description: description.trim() });
        if (error) {
            setError(error.message);
            return;
        }
        onNewTaskAdd(addedTask);
        setTitle('');
        setDescription('');
    }

    return (
        <>
            { error && <div className='error'>{ error }</div> }
            <form className='form-task' onSubmit={ handleFormSubmit }>
                <div className='form-task-control'>
                    <label>Title</label>
                    <input
                        type="text"
                        name='title'
                        placeholder='Enter a title'
                        value={ title }
                        onChange={ handleInputChange }
                        required
                    />
                </div>
                <div className='form-task-control'>
                    <label>Description</label>
                    <textarea
                        name='description'
                        placeholder='Enter a description'
                        value={ description }
                        onChange={ handleInputChange }
                        required
                    />
                </div>
                <input type="submit" value='Save task' className='btn btn-save' readOnly/>
            </form>
        </>
    )
};

export default AddTask;
