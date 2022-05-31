import React from 'react';
import './TodoItem.css';
import { formatDateTime } from '../utils';

function TodoItem(props) {
  const showDate = new Date(props.date);
  
  const showDateText = formatDateTime(showDate, ' ', 'D');
  
  
  return (
    <li className="TodoItem">
      <span className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
      onClick={props.onComplete}
      >
        √
      </span>
      <span>
      <p className={`TodoItem-d ${props.completed && 'TodoItem-d--complete'}`}
      onClick={props.onEdit}>
        {showDateText}
      </p>
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}
      onClick={props.onEdit}
      >
        {props.text} 
      </p>
      <span className="Icon Icon-delete"
      onClick={props.onDelete}
      >
        X
      </span>
    </li>
  );
}

export { TodoItem };
