import React, { useRef } from 'react'
import { getDaysInMonth, getDay, addDays, endOfDay, isBefore } from 'date-fns'

export default function Calendar({ month, selectCalendarDate }) {
   const calendar = useRef()
   const calendarArr = []

   for (let i = 0; i < getDay(month); i++) {
      calendarArr.push('x' + i)
   }
   for (let i = 1; i <= getDaysInMonth(month); i++) {
      calendarArr.push(i)
   }

   return (
      <div id='calendar' ref={calendar}>
         {calendarArr.map((day) => {
            return (
               <div
                  className={`calendar${day >= 1 ? 'Day' : 'Blank'}${
                     isBefore(endOfDay(addDays(month, day - 1)), new Date())
                        ? 'Past'
                        : ''
                  }`}
                  key={day}
                  onClick={() =>
                     selectCalendarDate(endOfDay(addDays(month, day - 1)))
                  }
               >
                  {day}
               </div>
            )
         })}
      </div>
   )
}
