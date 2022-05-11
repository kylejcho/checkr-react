import React, { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getDaysInMonth, getDay , startOfMonth, format, setDate} from "date-fns";

export default function Calendar({ month }) {
    const calendar = useRef()

    const daysInMonth = getDaysInMonth(month);
    const startDay = getDay(startOfMonth(month));
    const calendarArr = []
    useEffect(()=>{
      console.log(month)
    },[startDay])
    for (let i = 0; i < startDay; i++) {
       calendarArr.push('')
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarArr.push(i)
        //console.log(calendarArr)
    }

  return (
    <div id="calendar" ref={calendar}>
        {calendarArr.map(day=> {
            let className = (day>=1) ? '' : 'past';
            return <div className={`calendarDay${className}`} key={uuidv4}>{day}</div>
        })}
    </div>
  )
}
