import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isTomorrow } from 'date-fns';
import {ReactComponent as Caret} from '../../icons/caret-forward.svg'
import TaskViewCheckCircle from "./TaskViewCheckCircle";

export default function TaskView({ openTask, task, checkTask, taskContainer, complete, checkClickAnimation }) {
    const taskViewContainer = useRef()

    return (
        <AnimatePresence exitBeforeEnter >
            {openTask && openTask.id === task.id && (
                <motion.div 
                    key={'TvMotion' + task.id} 
                    className={`taskViewContainer ${task.complete && 'completed'}`}
                    id = {'Tv' + task.id}
                    ref={taskViewContainer}
                    animate={{ opacity: 1, x: -250 }}
                    initial={{ opacity: 0, right: -800}}
                    exit={{ 
                        opacity: 0, 
                        x: -50,
                        transition: { duration: 0.16 }
                    }}
                    transition={{ type:'spring',duration: 0.6, delay: 0.05}}
                >
                    <div className="taskViewNameContainer">
                        <div className={`taskViewCheckContainer`} >
                            <TaskViewCheckCircle taskContainer={taskContainer} checkTask={checkTask} complete={complete} checkClickAnimation={checkClickAnimation}/>
                        </div>
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

