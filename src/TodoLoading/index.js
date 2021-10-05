import React from 'react';
import './TodoLoading.css';

function TodoLoading() {
  return (
    <>
    <span className="LoadingTodo-container">
    <p className="LoadingTodo-text">Cargando Tareas...</p>
    </span>
    <div className="LoadingTodo-icon"/>
    </>
    );
}

export { TodoLoading };