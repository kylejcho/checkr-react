import React, { useRef, useState, useEffect } from "react";
import InputCalendarOptions from "./InputCalendarOptions";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { addDays, endOfDay } from "date-fns";

export default function Form({ handleClose, addTask}) {
    const nameRef = useRef();
    const descRef = useRef();
    const todayInput = useRef();
    const tomorrowInput = useRef();
    const today = endOfDay(new Date());
    const tomorrow = endOfDay(addDays(new Date(),1))

    const [dateSelection, setDateSelection] = useState(today)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [markCalendarInput, setMarkCalendarInput] = useState(false)

    function selectCalendarDate(date) {
        setDateSelection(date)
        setMarkCalendarInput(true)
        tomorrowInput.current.classList.remove('selected')
        todayInput.current.classList.remove('selected')
    }

    useEffect(()=> {
        todayInput.current.classList.add('selected')
    },[])

    function handleAddTaskClick() {
        if (nameRef.current.value === '') return
        const task = {
            name: nameRef.current.value, 
            description: descRef.current.value, 
            dueDate: dateSelection, 
            complete: false,
            id: uuidv4()
        };
        addTask(task);
        handleClose()
    }
    
    return (
        <div id="taskFormContainer" onClick={handleClose}>
            <motion.div id="taskForm" 
                variants={dropIn}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenCalendar(false)
                }}  
            >
                <input ref={nameRef} id="inputTaskName" type="text" placeholder="I want to..." required=""></input>
                <textarea ref={descRef} id="inputTaskDescription" name="description" rows="2" placeholder="Description..."></textarea>
                <div id="inputDueDateContainer">
                    <div className='inputDueDate' id="inputToday" ref={todayInput} 
                        onClick={()=>{
                            setDateSelection(today);
                            setMarkCalendarInput(false)
                            todayInput.current.classList.add('selected')
                            tomorrowInput.current.classList.remove('selected')
                        }}
                >
                        <ion-icon name="calendar-number-outline" role="img" className="md hydrated" aria-label="calendar number outline"></ion-icon>
                        Today
                    </div>
                    <div className='inputDueDate' id="inputTomorrow" ref={tomorrowInput} 
                        onClick={()=>{
                            setDateSelection(tomorrow);
                            setMarkCalendarInput(false)
                            tomorrowInput.current.classList.toggle('selected')
                            todayInput.current.classList.remove('selected')
                        }}
                    >  
                        <ion-icon name="today-outline" role="img" className="md hydrated" aria-label="today outline"></ion-icon>
                        Tomorrow
                    </div>
                    <motion.div 

                        id="inputCalendarContainer" 
              

                        transition= {{duration: 0.25}}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenCalendar(!openCalendar)
                        }}  
                    >
                        <motion.div 
                            id="inputCalendar"

                            style = {{

                                backgroundColor: markCalendarInput && '#ecf0f6'
                            }}
                            whileHover= {{
                                boxShadow: markCalendarInput ? '0 2px 6px 0 rgba(0,0,0,0)' : '0 2px 6px 0 rgba(0,0,0,0.17)',
                            }}
                        >
                            <ion-icon name="calendar-clear-outline" role="img" className="md hydrated" aria-label="calendar clear outline"></ion-icon>
                            <p id="dateSelection">Pick Date</p>
                        </motion.div>
                        <InputCalendarOptions openCalendar={openCalendar} selectCalendarDate={selectCalendarDate} />
                    </motion.div>
                    <div id="inputListContainer">
                        <div id="inputList">
                            <div className="dot"></div>
                            <p id="listSelectionName">Add to list</p>
                        </div>
                        <div id="inputListOptions">
                            <input id="inputListTextArea" type="text" placeholder="Type a list"></input>
                            <div id="createListButton" className="hidden"></div>
                        <p className="inputListItem" id="SchoolList">School</p><p className="inputListItem" id="ReadingList">Reading</p><p className="inputListItem" id="PersonalList">Personal</p></div>
                    </div>
                </div>
                <button id="taskFormAddButton" onClick={handleAddTaskClick}><ion-icon name="arrow-forward-circle-outline" role="img" className="md hydrated" aria-label="arrow forward circle outline"></ion-icon>Add task</button>
            </motion.div>
        </div>
    )
}

const dropIn = {
    initial: {
      x: "12vw",
      y: "-50vh",
      opacity: 0,
      scale: 0,
    },
    animate: {
      x: "0",
      y: "0",
      opacity: 1,
      scale: 1,
      transition: {
          duration: 0.4
        }
    },
    exit: {
      x: "12vw",
      y: "-50vh",
      opacity: 0,
      scale: 0,
      transition: {
          duration: 0.3
        }
    }
};
