import React, { useState }  from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthApi} from "./AuthApi";
import Cookie from "js-cookie"

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Auth = React.useContext(AuthApi)

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
        };
            axios
                .get(`http://localhost:4000/todos/user/${name}`)
                .then(res =>{
                    if (res.data.length > 0) {
                        alert("This name or email is already taken!")
                    } else {
                        axios
                            .post("http://localhost:4000/todos/user/registration", newUser)
                            .then(res => console.log(res.data))
                            .catch(e => {console.log(e)})


                        Cookie.set('user', name)
                        console.log(name)
                        Auth.setAuth(true)
                    }
                })


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

            <div >

            </div>

            <br/>
            <Link to={"Login"}>Already have an account?</Link>
        </div>
    );
}

export const Login = () => {


    const [name, setName] = useState("")
    const [passwordForm, setPasswordForm] = useState("")

    const Auth = React.useContext(AuthApi)

    const handleLogin = (e) => {
        e.preventDefault()
        axios
            .get(`http://localhost:4000/todos/user/${name}`)
            .then(res => {
                try {
                const [ { password } ] = res.data
                    if (password === passwordForm) {
                        Cookie.set("user", name)
                        Auth.setAuth(true)
                    }
                } catch (e) {
                    alert("Incorrect name or password!")
                }
            })


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
            <form onSubmit={handleLogin} className={"form-group"}>
                <div className="form-group">
                    <label>Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Name"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder={"Password"}
                        value={passwordForm}
                        onChange={e => setPasswordForm(e.target.value)}
                    />
                </div>
                <div className={"form-group"}>
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Login"
                    />
                </div>
            </form>

            <br/> <br/>
            <Link to={'Registration'}>Don't have an account?</Link>
        </div>
    )
}

