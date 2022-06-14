import React from "react";
import {Link} from "react-router-dom";
import {AuthApi} from "./AuthApi";
import Cookie from "js-cookie"

export const Register = () => {

    return (
        <div>
            <h2>Registration</h2>
            <button>Register</button>
            <br/> <br/>
            <Link to={"Login"}>Already have an account?</Link>
        </div>
    )
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

