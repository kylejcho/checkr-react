import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isTomorrow } from 'date-fns';
import {ReactComponent as Caret} from '../../icons/caret-forward.svg'
import TaskViewCheckCircle from "./TaskViewCheckCircle";
import {a} from "../Content"

export default function TaskView({ task }) {
    const taskViewContainer = useRef()

/*
    function taskViewOffset() {
        console.log(taskViewContainer.current.getBoundingClientRect().top)
        return taskViewContainer.current.getBoundingClientRect().top
    }

    useEffect(() => {
        console.log(a)
        taskViewContainer.current.style.top = `${a+100}px`
    }, [])
*/

useEffect(() => {
    console.log(task)
}, [])

    return (
        <AnimatePresence >
        {task && /*openTask.id === task.id &&*/ (

                <motion.div 
                    key={'TvMotion' + task.id} 
                    className={`taskViewContainer ${task.complete && 'completed'}`}
                    id={'Tv' + task.id}
                    ref={taskViewContainer}
                    initial={{ opacity: 0, right: 'calc(5vw)'}}
                    animate={{ 
                        opacity: 1, 
                        right: 'calc(20vw)',
                        transition:{ type:'spring', stiffness:350, damping:26, delay: 0.1}
                    }}
                    exit={{ 
                        opacity: 0, 
                        right:'calc(10vw)',
                        transition:{ type:'spring', stiffness:250, damping:26}
                    }}
                
                >
                    <div className="taskViewNameContainer">
                        <p className={`taskViewName`}>{task.name}</p>
                    </div>
                    <div className="taskViewDescriptionContainer">
                        Description:
                        <p className="taskViewDescription">{task.description}</p>
                    </div>
                    <div className="taskViewDueDateContainer">
                        Due:
                        <div className="taskViewDueDate">
                        
                            {formatDate(task.dueDate)}
                        </div>
                    </div>
                    {task.list && (
                        <div className="taskViewListContainer">
                            List:
                            <div className="taskViewList">
                                <div className="dot"></div>
                                {task.list}
                            </div>
                        </div>    
                    )}
                </motion.div>
                        )}    
                        </AnimatePresence>
    )
}


function formatDate(date) {
    const dateFormatted = format(date, 'EEEE, LLLL do, yyyy');
    return dateFormatted;
}

function checkDate(date) {
    if (isToday(date)) {
        return `Today ${date}`;
    } else if (isTomorrow(date)) {
        return`Tomorrow ${date}`;
    } 
}

