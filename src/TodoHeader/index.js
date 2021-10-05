import React from 'react';
import TODOLogo from '../images/logo-centro-pyf.png';
import './TodoHeader.css';

function TodoHeader() {
    return (
        <img className="TodoLogo" src={TODOLogo} alt='todo-logo' />
    );
}

export { TodoHeader };