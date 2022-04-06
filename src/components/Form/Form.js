import React, { useRef } from "react";
import InputCalendarOptions from "./InputCalendarOptions";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';

const dropIn = {
    initial: {
      x: "12vw",
      y: "-55vh",
      opacity: 0,
      scale: 0
    },
    animate: {
      x: "0",
      y: "0",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      },
    },
    exit: {
      x: "12vw",
      y: "-55vh",
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3
      },
    }
  };

export default function Form({ handleClose, addTask}) {
    const nameRef = useRef();
    const descRef = useRef();
    const formContRef = useRef();
    const form = useRef();

    function handleAddTaskClick() {
        if (nameRef.current.value === '') return
        const task = {
            name: nameRef.current.value, 
            description: descRef.current.value, 
            dueDate: new Date(), 
            complete: false,
            id: uuidv4()
        };
        addTask(task);
        handleClose()
    }
    
    return (
        <div id="taskFormContainer" ref={formContRef} onClick={handleClose}>
            <motion.div id="taskForm" ref={form}
                onClick={(e) => e.stopPropagation()}  
                variants={dropIn}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <input ref={nameRef} id="inputTaskName" type="text" placeholder="I want to..." required=""></input>
                <textarea ref={descRef} id="inputTaskDescription" name="description" rows="2" placeholder="Description..."></textarea>
                <div id="inputDueDateContainer">
                    <div className="inputDueDate selected" id="inputToday"><ion-icon name="calendar-number-outline" role="img" className="md hydrated" aria-label="calendar number outline"></ion-icon>Today</div>
                    <div className="inputDueDate" id="inputTomorrow"><ion-icon name="today-outline" role="img" className="md hydrated" aria-label="today outline"></ion-icon>Tomorrow</div>
                    <div id="inputCalendarContainer">
                        <div id="inputCalendar">
                            <ion-icon name="calendar-clear-outline" role="img" className="md hydrated" aria-label="calendar clear outline"></ion-icon>
                            <p id="dateSelection">Pick Date</p>
                        </div>
                        <InputCalendarOptions />
                    </div>
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