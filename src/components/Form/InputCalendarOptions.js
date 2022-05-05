import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InputCalendarOptions({ openCalendar }) {
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
                        <div id="calendarMonth">Mar 2022</div>
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
                    <div id="calendar">
                    <div className="calendarBlank"></div><div className="calendarBlank"></div><div className="calendarDayPast">1</div><div className="calendarDayPast">2</div><div className="calendarDayPast">3</div><div className="calendarDayPast">4</div><div className="calendarDayPast">5</div><div className="calendarDayPast">6</div><div className="calendarDayPast">7</div><div className="calendarDayPast">8</div><div className="calendarDayPast">9</div><div className="calendarDayPast">10</div><div className="calendarDayPast">11</div><div className="calendarDayPast">12</div><div className="calendarDayPast">13</div><div className="calendarDayPast">14</div><div className="calendarDayPast">15</div><div className="calendarDayPast">16</div><div className="calendarDayPast">17</div><div className="calendarDayPast">18</div><div className="calendarDayPast">19</div><div className="calendarDayPast">20</div><div className="calendarDayPast">21</div><div className="calendarDayPast">22</div><div className="calendarDay">23</div><div className="calendarDay">24</div><div className="calendarDay">25</div><div className="calendarDay">26</div><div className="calendarDay">27</div><div className="calendarDay">28</div><div className="calendarDay">29</div><div className="calendarDay">30</div><div className="calendarDay">31</div></div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}