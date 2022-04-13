import React, { useState, useEffect } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ subTasks, type, checkTask, removeTask }) {
    const [tasks, setTasks] = useState([])
    const [mounted, setmounted] = useState(false)
    
    useEffect(()=> {
        setTasks([...subTasks])
    },[subTasks])
    
    useEffect(() => {
        setmounted(true)
        setTimeout(()=> setmounted(false), 310);
    }, [])
    
    return (
        <motion.div className="subGroup" id={type}>
            <motion.div 
                layout 
                transition={{
                    type:'tween',
                    layout: {
                        duration: mounted ? 0 : 0.3
                    }
                }} 
                initial={false} 
                className="subGroupTitle"
            >
                {type[0].toUpperCase() + type.slice(1)}
            </motion.div>
            <Reorder.Group values={tasks} onReorder={setTasks}>
                {tasks.map(task=>{
                    return <Task subTasks={subTasks} task={task} key={task.id} checkTask={checkTask} removeTask={removeTask} />
                })}
            </Reorder.Group>
        </motion.div>
    )
}

