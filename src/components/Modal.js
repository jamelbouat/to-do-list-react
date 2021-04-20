import React, { useState, useEffect } from 'react';
import { useDialog } from 'react-st-modal';

import '../styles.css';

export function Modal({ prevTitle, prevDescription }) {
    const modal = useDialog();
    const [title, setTitle] = useState(prevTitle);
    const [description, setDescription] = useState(prevDescription);
    const [isUpdateButtonDisabled, setUpdateButtonStatus] = useState(true);
    const [error, setError] = useState(null);
    let result = {};

    const handleInputChange = (e) => {
        setError('');
        const target = e.target;
        target.name === 'title' ? setTitle(target.value) : setDescription(target.value);
    }

    useEffect(() => {
        title.trim() !== prevTitle || description.trim() !== prevDescription?
            setUpdateButtonStatus(false):
            setUpdateButtonStatus(true);

    }, [title, description, prevTitle, prevDescription]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            setError('Error: empty fields');
            return;
        }
        if (title !== prevTitle) {
            result = { title: title.trim() };
        }
        if (description !== prevDescription) {
            result = { ...result, description: description.trim() };
        }
        modal.close(result);
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
                        value={ title }
                        onChange={ handleInputChange }
                        required
                    />
                </div>
                <div className='form-task-control'>
                    <label>Description</label>
                    <textarea
                        name='description'
                        value={ description }
                        onChange={ handleInputChange }
                        required
                    />
                </div>
                <input
                    className='btn btn-update'
                    type="submit"
                    value='Update task'
                    disabled={ isUpdateButtonDisabled }
                    readOnly
                />
                <input
                    className='btn btn-cancel'
                    value='Cancel'
                    onClick={() => {
                        modal.close();
                    }}
                    readOnly
                />
            </form>
        </>
    );
}
