import React, {useState} from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import TodosList from "./components/TodosList";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
{/*<Route path="/" exact component={TodosList} />*/}
{/*<Route path="/edit/:id" component={EditTodo} />*/}
{/*<Route path="/create" component={CreateTodo} />*/}
import Nav from "./components/Nav";

import "bootstrap/dist/css/bootstrap.min.css";
import {PersonalTodosList} from "./components/PersonalTodosList";
import {Login, Register} from "./components/Register";
import {AuthApi} from "./components/AuthApi";


function App() {
    const [auth, setAuth] = useState(false)
    // const [date, setDate] = useState(31)
    return (
        <AuthApi.Provider value={{auth,setAuth}}>
            <Router>
                <Nav />
                    <div  className={"mx-5"}>
                        <Routes />
                    </div>
            </Router>
        </AuthApi.Provider>
    );
}



const Routes = () => {
    const Auth = React.useContext(AuthApi)
  return(
      <Switch>
          <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />
          <Route path="/" exact component={TodosList} />
          <Route path="/registration" component={Register} />
          <ProtectedRoute path="/dashboard" auth={Auth.auth} component={PersonalTodosList} />
      </Switch>
  )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={ () => auth ? (
                <Component/>
            ) : (
                <Redirect to="/login"/>
            )
        }/>
    )
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={ () => !auth ? (
            <Component/>
        ) :
            (
                <Redirect to="/dashboard"/>
            )
        } />
    )
}


export default App;
