import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {
  const onClickButton = () => {
    props.setOpenModal(prevState => !prevState)
    props.setTextTodo('');
    props.setDateTodo('');

                         // esto permite enviar como funcion 
                         // su estado previo,
                         // le devolvemos la negacion de ese estado anterior.
  };

  return (
    <button className="CreateTodoButton"
    // este onClick es una funcion porque si lo escribiera directamente asi:
    // onClick={console.log('click')} se ejecutaria cuando carga la pagina.
    // al ponerlo como una funcion, solo se ejecutará cuando realmente el evento ocurra
    // onClick={()=> console.log('click')}    
    // por eso hacemos una constante tipo "funcion" para mandarla al evento
    // si por el contrario, esta funcion recibiera un parametro, por ejemplo el msj a mostrar
    // entonces aunque ya es una funcion, debo llamarla asi: onClick={() => onClickButton(mmm)}
    onClick = {onClickButton}  
    >
      
      
      +
      
      </button>
  );
}

export { CreateTodoButton };
