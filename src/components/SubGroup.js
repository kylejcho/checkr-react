import React, { useState, useEffect, useRef } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ subTasks, type, updateTasks, removeTask, checkTask, viewTask, openTask }) {
    const [tasks, setTasks] = useState([])
    const [mounted, setmounted] = useState(false)
    
    const constraintsRef = useRef(null)

    useEffect(()=> {
        setTasks([...subTasks])
    },[subTasks])
    
    useEffect(() => {
        setmounted(true)
        setTimeout(()=> setmounted(false), 310);
    }, [])
    
    return (
        <div className="subGroup" id={type} ref={constraintsRef}>
            <motion.div 
                className="subGroupTitle"
                layout 
                transition={{
                    type:'tween',
                    duration: mounted ? 0 : 0.25
                }} 
            >
                {type[0].toUpperCase() + type.slice(1)}
            </motion.div>
            <Reorder.Group values={tasks} onReorder={setTasks}>
                {tasks.map(task=> {
                    return <Task 
                                key={task.id} 
                                task={task} 
                                tasks={tasks} 
                                viewTask={viewTask} 
                                openTask={openTask} 
                                checkTask={checkTask} 
                                removeTask={removeTask} 
                                updateTasks={updateTasks} 
                                constraintsRef={constraintsRef}
                            />
                })}
            </Reorder.Group>
        </div>
    )
}

