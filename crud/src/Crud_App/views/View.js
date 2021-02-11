import React, { useContext, useEffect, useState } from 'react';
import { ApiEndPoint } from "./../../DataProvider/Env";
import { TodoProvider } from '../../DataProvider/DataAPI';
import './view.css'
import { useHistory } from 'react-router-dom';

// const karan = [
//     {
//         id: "1",
//         fruit :"apple"
//     },
//     {
//         id: "2",
//         fruit :"banana"
//     },
//     {
//         id: "3",
//         fruit :"candy"
//     },
//     {
//         id: "4",
//         fruit :"grapes"
//     },
//     {
//         id: "4",
//         fruit :"mango"
//     },
//     {
//         id: "5",
//         fruit :"apple"
//     },
//     {
//         id: "6",
//         fruit :"cookies"
//     },
// ]


export default function View(setTodosChange) {

    const history = useHistory();

    const [desc, setDesc] = useState('');
    const [validated, setValidated] = useState(false);

    const valueTodo = useContext(TodoProvider)
    const [listTodo] = valueTodo.listTodo

  
    function handleClicky(mm) {
        history.push(`/${mm.todo_id}`)
    }

   
    function validateForm() {
        return desc.length > 1  // validator
    }

    const postTodo = async (e) => {
        e.preventDefault();
        try {
            const body = { desc };
            const postData = await fetch(`${ApiEndPoint}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(async (res) => {
                const parsemsg = await res.json()
                alert(parsemsg.message)
                window.location = "/";
            }).catch((err) => {
            console.log(err);
            })

        } catch (error) {
            alert("Something Went Wrong")
        }
    }


    return (
        <div className="main">
            <h1 className="heading">ToDo App</h1>

            <div>
                <form
                    noValidate
                    validated={validated}
                    onSubmit={postTodo}
                >
                    <input type="text"
                        className="form-input"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></input>
                    <button className="submit-button"
                        disabled={!validateForm()}
                    >Add</button>
                </form>
            </div>

            <div className="list">
                {
                    listTodo.length <= 0 &&
                    <h3>No items to display</h3>
                }
                {
                    listTodo.map((mm, index) => {
                        return (
                            <>
                                <div className="list-detail" key={index}>
                                    <div className="container">                                        
                                        <img
                                            src={`https://source.unsplash.com/1600x900/?${mm.todo_desc}`}
                                            alt="Sample photo"
                                            height="100px"
                                            width="100%"
                                            className="viewImage"
                                            onClick={() => handleClicky(mm)}
                                        />
                                    </div>
                                    <p className="text" onClick={() => handleClicky(mm)}>{mm.todo_desc}</p>
                                </div>
                            </>
                        )
                    })
                }

            </div>

        </div>
    )
}
