import { AnimatePresence } from "framer-motion";
import React from "react";
import TasksContainer from "./Task/TasksContainer";
import TaskView from "./Task/TaskView";
export default function Content({ tasks, checkTask, updateTasks, removeTask, openTask, viewTask}) {
    return (
        <div id="contentContainer" 
            onClick={()=> {
                viewTask(null)
                document.querySelectorAll('.taskContainer').forEach(task=>{
                    task.classList.remove('viewing')
                })
            }}>
            <TasksContainer tasks={tasks} checkTask={checkTask} updateTasks={updateTasks} removeTask={removeTask} viewTask={viewTask} openTask={openTask} />
            
        </div>
    )
}
