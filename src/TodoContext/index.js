import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
    const { 
        item: todos, 
        saveItem: saveTodos,
        loading,
        error
        } = useLocalStorage('TODOS_V1', []);
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
          const todoText = todo.text.toLowerCase() + todo.date.toLowerCase() + todo.time.toLowerCase();
          return todoText.includes(searchText);
        });
      }
    
      const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
      };
    
      const addTodo = (text, date) => {
        const newTodos = [...todos];
        newTodos.push({
            completed: false,
            date,
            //time,
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
