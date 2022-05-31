import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';
import { getDateFromFormat } from '../utils';
import Datetime from 'react-datetime';


function TodoForm() {
    const {
        addTodo,
        editTodo,
        textTodo,
        dateTodo,
        setOpenModal,
    } = React.useContext(TodoContext);
    const today=(!dateTodo ? new Date() : getDateFromFormat(dateTodo, 'yyyy-MM-dd HH:mm'));
    const [newTodoValue, setNewTodoValue] = React.useState(textTodo);
    const [newDateTodoValue, setNewDateTodoValue] = React.useState((!dateTodo ? new Date() : getDateFromFormat(dateTodo, 'yyyy-MM-dd HH:mm')));
    
    const onCancel = () => {
        setOpenModal(false);
    };

    const onChange = (event) => {
        setNewTodoValue(event.target.value)
    }
    /*const onChangeDate = (event) => {
        setNewDateTodoValue(event.target.value)
    }
    */
    const onChangeDate = (props) => {
            setNewDateTodoValue ( props.value );
            return (
              <div>
                <input {...props} />
              </div>
            );
    }
    const onSubmit = (event) => {
        event.preventDefault(); // evita que se recargue la pagina que es algo que el submit hace por default
        const newDateTodo = getDateFromFormat(newDateTodoValue, 'dd-MM-yyyy HH:mm');
        
        if (!textTodo){
            addTodo(newTodoValue, newDateTodo);
        } else {
            editTodo(textTodo, newTodoValue, newDateTodo );
        }        
        setOpenModal(false);
    };
    return (
        <form onSubmit={onSubmit}>
            <label className="label-box">{!textTodo ? "Nueva Tarea" : "Modificar Tarea"}</label>
            <label className="label-input">Tarea 
            <textarea
            value={newTodoValue}
            onChange={onChange} 
            placeholder="escribe aqui el texto para la nueva tarea"
            />
            </label>
            <label className="label-input">Fecha y Hora
            <Datetime 

                dateFormat="DD-MM-YYYY" 
                timeFormat="HH:mm"
                initialValue={today}
                //value={newDateTodoValue}
                renderInput={onChangeDate}
                //onChange={onChangeDate} 
            />
            {/*
            <input type="datetime-local"  
            min={today}
            value={newDateTodoValue}
            onChange={onChangeDate} 
            placeholder={today}
            />*/}
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
                    {!textTodo ? "Agregar" : "Modificar"}
                </button>
            </div>
        </form>
    );
}


export { TodoForm };
