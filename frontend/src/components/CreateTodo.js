import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Calendar from "react-calendar";


export default function CreateTodo({ history }) {
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [value, onChange] = useState(new Date());

  const onSubmit = e => {
    e.preventDefault();

    const todoDate = value.getDay()+'.'+value.getMonth()+'.'+value.getFullYear()

    console.log("Cookie saved is " + Cookie.get('user'))
    const todoOwner =  Cookie.get('user')

    const newTodo = {
      todoName,
      todoDesc,
      todoDate,
      todoOwner
    };


    console.log(newTodo)
    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then(res => {
        console.log(res.data)
        window.location = "/user/dashboard"
      })

  };


  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create Todo</h3>
      <div className={"d-flex justify-content-center align-items-center"}>
        <Calendar onChange={onChange} value={value} />
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            className="form-control"
            value={todoName}
            onChange={e => setTodoName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={todoDesc}
            onChange={e => setTodoDesc(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Todo"
          />
        </div>
      </form>
    </div>
  );
}
