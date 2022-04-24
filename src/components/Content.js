import React from "react";
import TasksContainer from "./Task/TasksContainer";
export default function Content({ tasks, checkTask, updateTasks, removeTask, openTask, viewTask}) {
    return (
        <div id="contentContainer" onClick={()=>{viewTask(null)}}>
            <TasksContainer tasks={tasks} checkTask={checkTask} updateTasks={updateTasks} removeTask={removeTask} viewTask={viewTask} openTask={openTask} />
        </div>
    )
}
