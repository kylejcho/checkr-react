import React, { useState, useEffect, useRef, useCallback } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ subTasks, type, updateTasks, removeTask, viewTask, openTask }) {


    const firstRender = useRef(true);
    useEffect(() => {
        setTimeout(() => {
            if (firstRender.current) {
                 firstRender.current = false;
                 return;
            }
        }, 450);
    });

    return (
        <div className="subGroup" id={type} >
            <motion.div 
                layout 
                className="subGroupTitle"
                transition={{duration: firstRender.current ? 0 : 0.25}} 
            >
                {type[0].toUpperCase() + type.slice(1)}
            </motion.div>
            <Reorder.Group values={subTasks} onReorder={updateTasks}>
                {subTasks.map(task=> {
                    return <Task 
                                key={task.id} 
                                task={task} 
                                tasks={subTasks} 
                                viewTask={viewTask} 
                                openTask={openTask} 
                                removeTask={removeTask} 
                                updateTasks={updateTasks}
                            />
                })}
            </Reorder.Group>
        </div>
    )
}