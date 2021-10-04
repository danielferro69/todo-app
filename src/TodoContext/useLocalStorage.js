import React from 'react';

function useLocalStorage(itemName, initialValue) {
    const [item, setItem] = React.useState(initialValue);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    // useEffect tiene la particularidad que se ejecuta despues de que todo el render se realizó.
    // y si recibe un segundo parametro que es un array y dentro del array por ejemplo, enviaramos una 
    // variable  como totalTodos, el useEffect solo se ejecutaria, luego de todo el render, siempre y cuando
    // la variable totalTodos hubiera cambiado. Sino, tampoco se ejecuta.
    React.useEffect( () => {
      // simulamos una espera como si llamaramos a una API
      setTimeout(() => {
        try {
          let localItem = JSON.parse( localStorage.getItem(itemName) );
  
        if (!localItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          localItem = initialValue;
        }
        setItem(localItem);
        setLoading(false);
        } catch(error) {
          setError(error);
        }
      }, 1000 );
  } //aqui iria ese segundo parametro como por ejemplo: ,[totalTodos]
  );
  
  const saveItem = (newItem) => {
    try {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
    } catch(error){
      setError(error);
    }
  }
  return {item, 
            saveItem,
            loading,
            error};
    
  };

export { useLocalStorage };
  