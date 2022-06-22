import React, { useState } from 'react'
import Calendar from './Calendar'
import { subMonths, addMonths, format, startOfMonth } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

export default function InputCalendarOptions({
   openCalendar,
   selectCalendarDate,
}) {
   const [month, setMonth] = useState(startOfMonth(new Date()))

   return (
      <AnimatePresence>
         {openCalendar && (
            <motion.div
               id='inputCalendarOptions'
               style={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.2 }}
            >
               <div id='calendarHeader'>
                  <div id='calendarMonth'>{format(month, 'MMM y')}</div>
                  <div
                     id='calendarArrowContainer'
                     onClick={(e) => e.stopPropagation()}
                  >
                     <ion-icon
                        id='backMonthIcon'
                        name='chevron-back-outline'
                        role='img'
                        className='md hydrated'
                        aria-label='chevron back outline'
                        onClick={() => setMonth(subMonths(month, 1))}
                     ></ion-icon>
                     <ion-icon
                        id='forwardMonthIcon'
                        name='chevron-forward-outline'
                        role='img'
                        className='md hydrated'
                        aria-label='chevron forward outline'
                        onClick={() => setMonth(addMonths(month, 1))}
                     ></ion-icon>
                  </div>
               </div>
               <div id='daysOfWeek'>
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
               </div>
               <Calendar
                  month={month}
                  selectCalendarDate={selectCalendarDate}
               />
            </motion.div>
         )}
      </AnimatePresence>
   )
}
