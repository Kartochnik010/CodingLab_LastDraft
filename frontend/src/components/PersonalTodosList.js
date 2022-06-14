import React, {useState} from "react";
import {AuthApi} from "./AuthApi";
import Cookie from "js-cookie"

export const PersonalTodosList = () => {

    const Auth = React.useContext(AuthApi)

    const handleLogout = () => {
        Cookie.remove('user')
        Auth.setAuth(false)
    }

  return (
    <div>
      <h2>Welcome, NAME! Here are your todos</h2>
      <p>You also need to create calendar</p>
        <button onClick={handleLogout}>Logout</button>


    </div>
  )
}