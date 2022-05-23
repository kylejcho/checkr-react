import React, { useRef, useState, useEffect } from "react";
import InputCalendarOptions from "./InputCalendarOptions";
import { AnimatePresence, m, motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { addDays, endOfDay } from "date-fns";
import InputListOptions from "./InputListOptions";

export default function Form({ tasks, handleClose, addTask, uniqueLists}) {
    const nameRef = useRef();
    const descRef = useRef();
    const todayInput = useRef();
    const tomorrowInput = useRef();
    const today = endOfDay(new Date());
    const tomorrow = endOfDay(addDays(new Date(),1))
    
    const [dateSelection, setDateSelection] = useState(today)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [markCalendarInput, setMarkCalendarInput] = useState(false)
    const [openList, setOpenList] = useState(false)
    const [listSelection, setListSelection] = useState(null)

    function createList(list) {
        setListSelection(list)
    }

    function selectCalendarDate(date) {
        setDateSelection(date)
        setMarkCalendarInput(true)
        tomorrowInput.current.classList.remove('selected')
        todayInput.current.classList.remove('selected')
    }

    useEffect(()=>todayInput.current.classList.add('selected'),[])

    function handleAddTaskClick() {
        if (nameRef.current.value === '') return
        const task = {
            name: nameRef.current.value, 
            description: descRef.current.value, 
            dueDate: dateSelection, 
            list: listSelection,
            complete: false,
            id: uuidv4()
        };
        addTask(task);
        handleClose()
    }
    
    return (
        <motion.div 
            id="taskFormContainer" 
            onClick={handleClose}
            initial = {{
                backdropFilter:'blur(0px)',
            }}
            animate={{
                backdropFilter:'blur(1.5px)',
                transition: { duration: 0.4 }
            }}
            exit= {{
                backdropFilter: 'blur(0px)',
                backgroundColor:'rgb(151, 159, 172,0)',
                transition: { duration: 0.3 }
            }}
        >
            <motion.div id="taskForm" 
                variants={dropIn}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenCalendar(false)
                    setOpenList(false)
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
                        className= {markCalendarInput && 'selected'}
                        transition= {{duration: 0.25}}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenCalendar(!openCalendar)
                        }}  
                    >
                        <div id="inputCalendar">
                            <ion-icon name="calendar-clear-outline" role="img" className="md hydrated" aria-label="calendar clear outline"></ion-icon>
                            <p id="dateSelection">Pick Date</p>
                        </div>
                        <InputCalendarOptions openCalendar={openCalendar} selectCalendarDate={selectCalendarDate} />
                    </motion.div>
                    <motion.div 
                        id="inputListContainer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenList(!openList)
                        }}  
                    >
                        <div id="inputList">
                            <div className="dot"></div>
                            <p id="listSelectionName">{listSelection ? listSelection : 'Add to list'}</p>
                        </div>
                        <InputListOptions tasks={tasks} openList={openList} createList={createList} uniqueLists={uniqueLists}/>
                    </motion.div>
                </div>
                <button id="taskFormAddButton" onClick={handleAddTaskClick}>Add task<ion-icon name="arrow-forward-outline"></ion-icon></button>
            </motion.div>
        </motion.div>
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
