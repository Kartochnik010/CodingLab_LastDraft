import React, { useState, useEffect } from "react";
import axios from "axios";

import Todo from "./Todo";
import Cookie from "js-cookie";
import {AuthApi} from "./AuthApi";
import {Link} from "react-router-dom";
import {Calendarik} from "./Calendar";

export default function TodosList() {
  //using default useState hook to define todos
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Auth = React.useContext(AuthApi)

  const handleLogout = () => {
    Cookie.remove('user')
    Auth.setAuth(false)
  }

  //fetching todos from out backend API using axios get method
  function fetchTodos() {
      const cookie = Cookie.get('user')
    axios
      //  GET method from local server
      .get(`http://localhost:4000/todos/name/${cookie}`)
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
      <h2>Welcome, {""+Cookie.get('user')}! Here are your todos</h2>
        <Calendarik />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
              <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => {
            return <Todo key={todo._id} todo={todo} />;
          })}
        </tbody>
      </table>
      <br/>
        <Link className="btn btn-primary" to="/create">
            New todo
        </Link>
        <button className={"btn btn-outline-primary float-right"}    onClick={handleLogout} >Logout</button>
        <br/>
        <br/>
        <br/>
    </div>
  ) : (
    <div>
        There are no Todos yet
        <br/>
        <Link className={"btn btn-primary"} to={"/create"}>New todo</Link>
        <br/>
        <br/>
        <button className={"btn btn-primary"} onClick={handleLogout}>Logout</button>
    </div>

  );
}
