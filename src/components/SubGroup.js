import React, { useState, useEffect, useRef, useCallback } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

function SubGroup({ subTasks, updateSubTasks, type, updateTasks, removeTask, viewTask, openTask}) {
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
            <Reorder.Group values={subTasks} onReorder={updateSubTasks}>
                {subTasks.map(task=> {
                    return <Task 
                                key={task.id} 
                                task={task} 
                                subTasks={subTasks} 
                                updateSubTasks={updateSubTasks}
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
export default React.memo(SubGroup)