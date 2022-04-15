import React, { useState, useEffect } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ subTasks, type }) {
    const [tasks, setTasks] = useState([])
    const [mounted, setmounted] = useState(false)
    
    function checkTask(task) {
        let prevTasks = [...tasks];
        const checkedTask = prevTasks.find(item => item.id === task);
        checkedTask.complete = !checkedTask.complete;
        const index = prevTasks.indexOf(checkedTask);
        if (checkedTask.complete) {
          prevTasks.push(prevTasks.splice(index,1)[0])
        } else {
          prevTasks.unshift(prevTasks.splice(index,1)[0])
        }
        setTimeout(() => setTasks([...prevTasks]), 100);
    }

    function removeTask(task) {
        let prevTasks = [...tasks];
        const taskIndex = prevTasks.findIndex(item => item.id === task);
        prevTasks.splice(taskIndex, 1);
        setTasks([...prevTasks]);
    }

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
                    layout: {duration: mounted ? 0 : 0.3}
                }} 
            >
                {type[0].toUpperCase() + type.slice(1)}
            </motion.div>
            <Reorder.Group values={tasks} onReorder={setTasks}>
                {tasks.map(task=>{
                    return <Task subTasks={subTasks} task={task} key={task.id} checkTask={checkTask} removeTask={removeTask} />
                })}
            </Reorder.Group>
        </div>
    )
}

