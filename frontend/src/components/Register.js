import React, { useState }  from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthApi} from "./AuthApi";
import Cookie from "js-cookie"

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
        };
        axios
            .post("http://localhost:4000/todos/user/registration", newUser)
            .then(res => console.log(res.data))
            .then(() => history.push("/"));
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Registration</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        name={"email"}
                        className="form-control"
                        placeholder={"Email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Name"}
                        name={"name"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        placeholder={"Password"}
                        className="form-control"
                        value={password}
                        name={"name"}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Register"
                    />
                </div>
            </form>
            <br/>
            <Link to={"Login"}>Already have an account?</Link>
        </div>
    );
}

export const Login = () => {
    const Auth = React.useContext(AuthApi)
    const handleLogin = () => {
        Cookie.set("user","loginTrue")
        Auth.setAuth(true)
    }
    const readCookie = () => {
      const user = Cookie.get("user")
        if (user) {
            Auth.setAuth(true)
        }
    }
    React.useEffect(()=>{
        readCookie()
    },[])
    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
            <br/> <br/>
            <Link to={'Registration'}>Don't have an account?</Link>
        </div>
    )
}

