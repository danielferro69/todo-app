import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css';

function TodoCounter() {
    const {totalTodos, completedTodos} = React.useContext(TodoContext);
    return ( 
        <span><p className="TodoCounter">{completedTodos} de {totalTodos} Tareas Realizadas</p></span>
    );
}

export { TodoCounter };