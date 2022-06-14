import React, { useState, useEffect } from "react";
import axios from "axios";

import Todo from "./Todo";

export default function TodosList() {
  //using default useState hook to define todos
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //fetching todos from out backend API using axios get method
  function fetchTodos() {
    axios
      //  GET method from local server
      .get("http://localhost:4000/todos")
      // once GET method has been successfully completed it will set the
        // data from backend to previously defined todos
      .then(res => {
        setTodos(res.data);
      })
      // if GET method fails it will catch an error and log it in console
      .catch(err => {
        console.log(err);
      });
  }
  //useEffect hook will run commands as page is loaded
  //meaning it will automatically fetch necessary data
  useEffect(() => {
    fetchTodos();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : todos.length ? (
    <div>
      <h3>To do List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsibility</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => {
            return <Todo key={todo._id} todo={todo} />;
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div>There are no Todos yet</div>
  );
}
