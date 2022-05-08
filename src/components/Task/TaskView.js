import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isTomorrow } from 'date-fns';
import {ReactComponent as Caret} from '../../icons/caret-forward.svg'

export default function TaskView({ openTask }) {

    return (
        <AnimatePresence exitBeforeEnter>
            {openTask &&  (
                <motion.div 
                
                    key={'TV' + openTask.id} 
                    className="taskViewContainer"
                    animate={{ opacity: 1, x: -300 }}
                    initial={{ opacity: 0}}
                    exit={{ 
                        opacity: 0, 
                        y: 100,
                        transition: {
                            duration: 0.15
                        }
                    }}
                    transition={{ type:'spring',duration: 0.30 }}
                >
                    <div className="taskViewNameContainer">
                        <div className="taskViewCheckContainer completed" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512">
                                <title>ionicons-v5-e</title>
                                <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM364.25,186.29l-134.4,160a16,16,0,0,1-12,5.71h-.27a16,16,0,0,1-11.89-5.3l-57.6-64a16,16,0,1,1,23.78-21.4l45.29,50.32L339.75,165.71a16,16,0,0,1,24.5,20.58Z"></path>
                            </svg>
                        </div>
                        <p className="taskViewName completed">{openTask.name}</p>
                    </div>
                    <div className="taskViewDescriptionContainer">
                        Description:
                        <p className="taskViewDescription">{openTask.description}</p>
                    </div>
                    <div className="taskViewDueDateContainer">
                        Due:
                        <div className="taskViewDueDate">
                        
                            {formatDate(openTask.dueDate)}
                        </div>
                    </div>
                    {openTask.list && (
                        <div className="taskViewListContainer">
                            List:
                            <div className="taskViewList">
                                <div className="dot"></div>
                                {openTask.list}
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

