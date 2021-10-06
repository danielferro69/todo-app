import React from 'react';
import './TodoLoading.css';

function TodoLoading() {
  return (
    <section>
    <span className="LoadingTodo-container">
    <p className="LoadingTodo-text">Cargando Tareas...</p>
    </span>
    <div className="LoadingTodo-icon"/>
    </section>
    );
}

export { TodoLoading };