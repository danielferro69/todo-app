import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';
import { formatDateTime } from '../utils';


function TodoForm() {
    const today=formatDateTime(new Date(), 'T');
    const [newTodoValue, setNewTodoValue] = React.useState('');
    const [newDateTodoValue, setNewDateTodoValue] = React.useState(formatDateTime(new Date(), 'T'));
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
    const onChangeDate = (event) => {
        setNewDateTodoValue(event.target.value)
    }
    const onSubmit = (event) => {
        event.preventDefault(); // evita que se recargue la pagina que es algo que el submit hace por default
        addTodo(newTodoValue, newDateTodoValue);
        setOpenModal(false);
    };
    return (
        <form onSubmit={onSubmit}>
            <label className="label-box">Nueva Tarea</label>
            <label className="label-input">Tarea 
            <textarea
            value={newTodoValue}
            onChange={onChange} 
            placeholder="escribe aqui el texto para la nueva tarea"
            />
            </label>
            <label className="label-input">Fecha y Hora
            <input type="datetime-local"  
            min={today}
            value={newDateTodoValue}
            onChange={onChangeDate} 
            placeholder={today}
            />
            </label>
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
