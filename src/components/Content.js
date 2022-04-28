import React, { useEffect } from "react";
import TasksContainer from "./Task/TasksContainer";
export default function Content({ contentType, tasks, checkTask, updateTasks, removeTask, openTask, viewTask}) {

    return (
        <div id="contentContainer" onClick={()=>{viewTask(null)}}>
            <TasksContainer contentType={contentType} tasks={tasks} checkTask={checkTask} updateTasks={updateTasks} removeTask={removeTask} viewTask={viewTask} openTask={openTask} />
        </div>
    )
}
