import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css';

function TodoCounter() {
    const {totalTodos, completedTodos} = React.useContext(TodoContext);
    return ( 
        <p className="TodoCounter">Tareas Realizadas {completedTodos} de {totalTodos}</p>
    );
}

export { TodoCounter };