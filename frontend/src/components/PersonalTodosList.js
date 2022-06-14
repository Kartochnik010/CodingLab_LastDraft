import React, {useState} from "react";

export const PersonalTodosList = () => {
    const handleLogout = () => {
        Cookies.remove('user')
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