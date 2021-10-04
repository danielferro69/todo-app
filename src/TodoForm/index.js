import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';

function TodoForm() {
    const [newTodoValue, setNewTodoValue] = React.useState('');
    const {
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);
    const onCancel = () => {
        setOpenModal(false);
    };

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault(); // evita que se recargue la pagina que es algo que el submit hace por default
        addTodo(newTodoValue);
        setOpenModal(false);
    };
    return (
        <form onSubmit={onSubmit}>
            <label>Nueva Tarea</label>
            <textarea
            value={newTodoValue}
            onChange={onChange} 
            placeholder="escribe aqui el texto para nueva tarea"
            />
            <div className="TodoForm-buttonContainer">
                <button
                    type="button"
                    className="TodoForm-button TodoForm-button--cancel"
                    onClick={onCancel}>
                    Cancelar
                </button>
                <button 
                    type="submit"
                    
                    className="TodoForm-button TodoForm-button--add">
                    Agregar
                </button>
            </div>
        </form>
    );
}

export { TodoForm };
