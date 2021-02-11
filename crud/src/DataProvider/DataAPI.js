import React, {createContext, useState, useEffect} from 'react'
import { ApiEndPoint } from './Env'
export const TodoProvider = createContext();

export function DataAPI(props) {

    const [listTodo, setListTodo] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    const getTodos = async () => {
        try {
            const response = await fetch(`${ApiEndPoint}/`, {
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }).catch((err) =>{                
                console.log(err);
            })
            const parseData = await response.json()
            setListTodo(parseData.result)
            // console.log(parseData.result);
        } catch (error) {
            console.log(error);
        }
       
    }
    useEffect(() => {
        getTodos();
      }, []);

    const todoValue = {
        listTodo: [listTodo, setListTodo]
    }

    

    return (
<>
        <TodoProvider.Provider value={todoValue}>
                {props.children}
            </TodoProvider.Provider>
            </>
    )
}

