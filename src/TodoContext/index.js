import React from 'react';
import { useLocalStorage } from './useLocalStorage';
import { formatDateTime } from '../utils';

const TodoContext = React.createContext();

function TodoProvider(props) {
    const { 
        item: todos, 
        saveItem: saveTodos,
        loading,
        error,
        } = useLocalStorage('TODOS_V1', []);

      const [textTodo, setTextTodo] = React.useState('');
      const [dateTodo, setDateTodo] = React.useState(formatDateTime(new Date(),'T'));
      const [searchValue, setSearchValue] = React.useState('');
      const [openModal, setOpenModal] = React.useState(false);
                                      // esto es todo.completed == true es el ! del !
      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
    
      let searchedTodos = [];
    
      if (!searchValue.length >= 1)
      {
         searchedTodos = todos
      } else {
        searchedTodos = todos.filter( todo => {
          const searchText = searchValue.toLowerCase();
          const todoText = todo.text.toLowerCase() + todo.date.toLowerCase();
          return todoText.includes(searchText);
        });
      }
    
      const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
      };
   
      const editTodo = (oldText, newText, newDate) => {
        const todoIndex = todos.findIndex(todo => todo.text === oldText);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = false;
        newTodos[todoIndex].text = newText;
        newTodos[todoIndex].date = newDate;
        saveTodos(newTodos);
      };
      
      const addTodo = (text, date) => {
        console.log(text);
        console.log(date);
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            date,
            text,
        })
        saveTodos(newTodos);
      };
    
      const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice( todoIndex, 1 ); // elimina el elemento ( pos, cuantos desde ahi )
        saveTodos(newTodos);
      };
    
    return(
    <TodoContext.Provider value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        addTodo,
        editTodo,
        textTodo,
        setTextTodo,
        dateTodo,
        setDateTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal
    }}>
        {props.children}
    </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };
