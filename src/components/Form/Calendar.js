import React, { useRef, useState } from 'react'
import { getDaysInMonth, getDay , startOfMonth, format, setDate} from "date-fns";

export default function Calendar() {
    const [dateSelection, setDateSelection] = useState(new Date)

    const daysInMonth = getDaysInMonth(dateSelection);
    const startDay = getDay(startOfMonth(dateSelection));
    const calendarArr = []

    for (let i = 0; i < startDay; i++) {
       calendarArr.push('')
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarArr.push(i)
        console.log(calendarArr)
    }

  return (
    <div id="calendar">
        {calendarArr.map(day=> {
            let className = 'past';
            if (day>=1) className = ''
            return <div className={`calendarDay${className}`} key={day}>{day}</div>
        })}
    </div>
  )
}
