import React, { useState } from "react"
import Calendar from "./Calendar"
import { getMonth, addMonths, format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

export default function InputCalendarOptions({ openCalendar }) {
    const [month, setMonth] = useState(format(new Date, 'MMM y'))
    return (
        <AnimatePresence>
            {openCalendar && (
                <motion.div 
                    id="inputCalendarOptions"
                    style={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration:0.2}}
                >
                    <div id="calendarHeader">
                        <div id="calendarMonth">{month}</div>
                        <div id="calendarArrowContainer">
                            <ion-icon id="backMonthIcon" name="chevron-back-outline" role="img" className="md hydrated" aria-label="chevron back outline"></ion-icon>
                            <ion-icon id="forwardMonthIcon" name="chevron-forward-outline" role="img" className="md hydrated" aria-label="chevron forward outline"></ion-icon>
                        </div>
                    </div>
                    <div id="daysOfWeek">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <Calendar />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

