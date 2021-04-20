import React from 'react';
import Button from './Button';

const Header = ({ handleFormShow}) => (
    <div className='header'>
        <h1>Tasks list</h1>
        <Button handleFormShow={ handleFormShow }/>
    </div>

);

export default Header;
