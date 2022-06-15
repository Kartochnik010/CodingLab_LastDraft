import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Todo({ todo }) {
    const deleteTodo = e => {
        // e.preventDefault();
        axios
            .post(`http://localhost:4000/todos/delete/${todo._id}`)
            .then(res => console.log(res.data))
    };

    return (
        <tr>
            <td className={todo.todoCompleted ? "completed" : ""}>{todo.todoName}</td>
            <td className={todo.todoCompleted ? "completed" : ""}>
                {todo.todoDesc}
            </td>
            <td className={todo.todoCompleted ? "completed" : ""}>
                {todo.todoDate}
            </td>
            <td>
                <form onSubmit={deleteTodo}>
                    <button className={"btn btn-sm btn-outline-primary"}>Delete</button>
                </form>
            </td>
        </tr>
    );
}
