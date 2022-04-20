import React, { useState, useEffect, useCallback } from "react";
import Task from "./Task/Task";
import { motion, Reorder} from "framer-motion";

export default function SubGroup({ subTasks, allTasks, type, updateTasks }) {
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
        setTasks([...prevTasks])
    }

    //function removeTask(task) {
    //    setTasks(prevTasks => prevTasks.filter(item => item.id !== task))
   // }

    const removeTask = useCallback((task) => {
        setTasks(tasks => tasks.filter(item => item.id !== task))
        console.log(tasks)
    }, []);


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
                    return <Task tasks={tasks} task={task} alltasks={allTasks} key={task.id} checkTask={checkTask} removeTask={removeTask} updateTasks={updateTasks} />
                })}
            </Reorder.Group>
        </div>
    )
}

