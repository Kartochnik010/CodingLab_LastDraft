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
import {Login, Register} from "./components/Register";
import {AuthApi} from "./components/AuthApi";


function App() {
    const [auth, setAuth] = useState(false)
    // const [date, setDate] = useState(31)
    return (
        <AuthApi.Provider value={{auth,setAuth}}>
            <Router>
                <div>
                    <Nav />
                    <div  className={"mx-5"}>
                        <RoutesForLife />
                    </div>
                </div>
            </Router>
        </AuthApi.Provider>
    );
}



const RoutesForLife = () => {
    const Auth = React.useContext(AuthApi)
  return(
      <Switch>

          <ProtectedRoute path="/edit/:id" auth={Auth.auth} component={EditTodo} />
          <ProtectedRoute path="/create" auth={Auth.auth} component={CreateTodo} />
          <ProtectedRoute path="/" auth={Auth.auth} exact component={TodosList} />

          <ProtectedLogin path="/user/login" auth={Auth.auth} component={Login} />
          <ProtectedLogin path="/user/registration" auth={Auth.auth} component={Register} />
          <ProtectedRoute path="/user/dashboard" auth={Auth.auth} component={TodosList} />
      </Switch>
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
                <Redirect to="/user/dashboard"/>
            )
        } />
    )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render={ () => auth ? (
                <Component/>
            ) : (
                <Redirect to="/user/login"/>
            )
            }/>
    )
}


export default App;
