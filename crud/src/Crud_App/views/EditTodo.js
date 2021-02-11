import React, { useContext, useState } from 'react';
import './view.css'
import { ApiEndPoint } from "./../../DataProvider/Env";
import { useParams } from 'react-router-dom';
import { TodoProvider } from '../../DataProvider/DataAPI';

export default function EditTodo(props) {

    const { id } = useParams();
    const [desc, setDesc] = useState('');
    const [validated, setValidated] = useState(false);

    const valueTodo = useContext(TodoProvider)
    const [listTodo] = valueTodo.listTodo

    function validateForm() {
        return desc.length > 1  // validator
    }

    const patchTodo = async (e) => {
        e.preventDefault();
        try {
            const body = { desc };
            const postData = await fetch(`${ApiEndPoint}/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(async (res) => {
                const parsemsg = await res.json()
                alert(parsemsg.message)
                window.location = `/${id}`;
            }).catch((err) => {
                console.log(err);
            })

        } catch (error) {
            console.log(error);
            alert("Something Went Wrong")
        }
    }


    const deleteItem = async (mm) => {
        try {
            const postData = await fetch(`${ApiEndPoint}/${id}`, {
                method: "DELETE",
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
            <h1 className="heading">EDIT</h1>

            <div>
                <form
                    noValidate
                    validated={validated}
                    onSubmit={patchTodo}
                >
                    <input type="text"
                        className="form-input"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></input>

                    <button className="submit-button"
                        disabled={!validateForm()}
                    >Edit</button>
                    
                </form>
            </div>

            <div className="list">
                {
                    listTodo.length <= 0 &&
                    <h3>No items to display</h3>
                }
                {
                    listTodo.map((mm, index) => {
                        if (mm.todo_id == id) {
                            return (
                                <>
                                    <div className="list-detail" key={index}>
                                        <div className="container">
                                            <span className="delete-text" onClick={() => { deleteItem(mm.todo_id) }}>X</span>
                                            <img
                                                src={`https://source.unsplash.com/1600x900/?${mm.todo_desc}`}
                                                alt="Sample photo"
                                                height="100px"
                                                width="100%"
                                            />
                                        </div>
                                        <p className="text">{mm.todo_desc}</p>
                                    </div>
                                </>
                            )
                        }
                    })
                }

            </div>

        </div>
    )
}

