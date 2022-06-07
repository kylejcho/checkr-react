import React, { useRef, useState, useEffect } from "react";
import InputCalendarOptions from "./InputCalendarOptions";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { addDays, endOfDay, format, getDate, parseJSON} from "date-fns";
import InputListOptions from "./InputListOptions";
import {db} from '../../firebase'
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase";
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
        const uuid = uuidv4()
        const task = {
            name: nameRef.current.value, 
            description: descRef.current.value, 
            dueDate: dateSelection, 
            list: listSelection,
            complete: false,
            id: uuid
        };

        writeUserData(task)
          
        addTask(task);
        handleClose()
    }

    const writeUserData = async (task) => {
        try {
            const docRef = await addDoc(collection(db, `${auth.currentUser.uid}`), task);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }


    return (
        <motion.div 
            id="taskFormContainer" 
            onClick={handleClose}
            initial = {{
                backgroundColor: 'rgba(74, 78, 83, 0)'
            }}
            animate={{
                backgroundColor: 'rgba(74, 78, 83, 0.5)',
                transition: { duration: 0.4 }
            }}
            exit= {{

                backgroundColor: 'rgba(74, 78, 83, 0)',
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <rect fill="none" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/>
                        <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="128" y1="48" x2="128" y2="80"/>
                        <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="384" y1="48" x2="384" y2="80"/>
                        <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="464" y1="160" x2="48" y2="160"/>
                        <text className = "todayIconNumber" x="50%" y="62%" textAnchor="middle"  fontSize="250px" fontFamily="Inter" textLength="55%" dy=".3em" >{getDate(new Date())}</text>
                    </svg>                 
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <rect fill="none" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/>
                        <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="128" y1="48" x2="128" y2="80"/>
                        <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="384" y1="48" x2="384" y2="80"/>
                        <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="464" y1="160" x2="48" y2="160"/>
                        <text className = "todayIconNumber" x="50%" y="62%" textAnchor="middle"  fontSize="250px" fontFamily="Inter" textLength="55%" dy=".3em" >{getDate(addDays(new Date(),1))}</text>
                    </svg>      
                        Tomorrow
                    </div>
                    <motion.div 
                        id="inputCalendarContainer" 
                        className= {markCalendarInput ? 'selected': undefined}
                        transition= {{duration: 0.25}}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenCalendar(!openCalendar)
                        }}  
                    >
                        <div id="inputCalendar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\
                        <rect fill="none" strokeLinejoin="round" strokeWidth="32" x="48" y="80" width="416" height="384" rx="48"/>
                            <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="128" y1="48" x2="128" y2="80"/>
                            <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="384" y1="48" x2="384" y2="80"/>
                            <line fill="none" strokeLinejoin="round" strokeWidth="32" strokeLinecap="round" x1="464" y1="160" x2="48" y2="160"/>
                        </svg>
                            <p id="dateSelection">{markCalendarInput ? format(dateSelection, 'MMM d'): 'Pick date'}</p>
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
