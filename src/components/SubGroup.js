import React, { useState, useEffect, useCallback } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ subTasks, allTasks, type, updateTasks, removeTask, checkTask, viewTask, openTask }) {
    const [tasks, setTasks] = useState([])
    const [mounted, setmounted] = useState(false)
    


    //function removeTask(task) {
    //    setTasks(prevTasks => prevTasks.filter(item => item.id !== task))
   // }




    useEffect(()=> {
        setTasks([...subTasks])
    },[subTasks])
    
    useEffect(() => {
        setmounted(true)
        setTimeout(()=> setmounted(false), 310);
    }, [])
    
    return (
        <div className="subGroup" id={type}>
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
                {tasks.map(task=>{
                    return <Task tasks={tasks} task={task} alltasks={allTasks} key={task.id} checkTask={checkTask} removeTask={removeTask} updateTasks={updateTasks} viewTask={viewTask} openTask={openTask} />
                })}
            </Reorder.Group>
        </div>
    )
}

