import React from 'react';
import TODOLogo from '../images/logo-centro-pyf.png';
import './TodoHeader.css';

function TodoHeader() {
    return (
        <h2 className="Content">
        <img className="TodoLogo" src={TODOLogo} alt='todo-logo' />
        Lista de Tareas
        </h2>
    );
}

export { TodoHeader };