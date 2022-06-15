import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
import 'react-calendar/dist/Calendar.css';


export const Calendarik = () => {
    const [value, onChange] = useState(new Date());
    const [day, month, year] = [value.getDate(), value.getMonth(), value.getFullYear()]
  return(

      <div>
        <div className={"container"}>
            <Calendar onChange={onChange} value={value} />
        </div>
          <p className={"text-center"}>{""+value}</p>
          <p>{day}.{month}.{year}</p>
      </div>
  )
}
