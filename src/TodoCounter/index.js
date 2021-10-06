import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css';

function TodoCounter() {
    const {totalTodos, completedTodos} = React.useContext(TodoContext);
    return (
        <h2>
        <p className="TodoCounter">Tareas Realizadas {completedTodos} de {totalTodos}</p>
        </h2> 
    );
}

export { TodoCounter };