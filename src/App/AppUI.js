import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoLoading } from '../TodoLoading';
import { TodoHeader } from '../TodoHeader';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';

function AppUI() {
  const {
    error,
    loading,
    searchValue,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);
  
  return (
    // cuando necesitamos enviar varios componentes dentro de un mismo render
    // como react requiere que vayan dentro de un unico
    // componente, esta sintaxis llmando al componente React.Fragment
    // y encerrando todos los otros componentes dentro de el
    // no genera un error y nos permite trabajar sin necesidad
    // de tener que separar cada componente en diferentes funciones

    <React.Fragment>
      <TodoHeader />
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <p>Ocurrió un error. Intente recargar la pagina</p>}
        {loading && <TodoLoading />} 
        {((!loading && !searchedTodos.length) && !!searchValue.length) && <p>No hubo coincidencias en la b&uacute;squeda</p>}
        {(!loading && !searchedTodos.length && !searchValue.length) && <p>Cree su primera Tarea</p>}
        
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            date={todo.date}
            time={todo.time}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {!!openModal && (
        <Modal>
            <TodoForm />
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  );
}

export { AppUI };