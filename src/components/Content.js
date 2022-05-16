import React, { useEffect } from "react";
import TasksContainer from "./Task/TasksContainer";
import { motion } from "framer-motion";
function Content({ contentType, tasks, checkTask, updateTasks, removeTask, openTask, viewTask}) {
    return (
        <motion.div layoutScroll id="contentContainer" onClick={()=>{viewTask(null)}}>
            <TasksContainer contentType={contentType} tasks={tasks} checkTask={checkTask} updateTasks={updateTasks} removeTask={removeTask} viewTask={viewTask} openTask={openTask} />
        </motion.div>
    )
}

export default React.memo(Content)