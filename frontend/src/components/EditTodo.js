import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditTodo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [todoDesc, setTodoDesc] = useState("");
  const [todoName, setTodoName] = useState("");
    console.log(props)
  useEffect(() => {
    axios
        .get(`http://localhost:4000/todos/${match.params.id}`)
        .then(res => {
          console.log(res.data)
          const { todoName, todoDesc } = res.data;
          setTodoName(todoName);
          setTodoDesc(todoDesc);
        })
        .then(() => setIsLoading(false))
        .catch(err => {
          console.log(err);
        });
  }, [match.params.id]);

  const onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      todoName,
      todoDesc
    };

    axios
        .post(`http://localhost:4000/todos/update/${params.id}`, newTodo)
        .then(res => console.log(res.data))
        .then(() => history.push("/"));
  };


  return !isLoading ? (
      <div style={{ marginTop: 20 }}>
        <h3>Edit Todo</h3>
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
          <br />
          <br />
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Edit Todo" />

            <input
                type="button"
                className="btn btn-danger float-right"
                value="Delete Todo"
                onClick={deleteTodo}
            />
          </div>
        </form>
      </div>
  ) : (
      <div>Getting Todo</div>
  );
}
