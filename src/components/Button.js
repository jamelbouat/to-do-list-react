import React, { useState } from 'react';

const Button = ({ handleFormShow }) => {
    const [buttonStatus, setButtonStatus] = useState(false);

    const handleOnButtonClick = () => {
        setButtonStatus(!buttonStatus);
        handleFormShow();
    }

    return(
        <button
            className={ `btn ${ buttonStatus ? 'btn-on-toggle-close' : 'btn-on-toggle-open'}` }
            onClick={ handleOnButtonClick }
        >
        {
            buttonStatus ? 'Close Form': 'Add task'
        }
        </button>
    );
};

export default Button;
