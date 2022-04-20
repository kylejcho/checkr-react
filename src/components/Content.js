import React from "react";
import TasksContainer from "./Task/TasksContainer";
import TaskView from "./Task/TaskView";
export default function Content({ tasks, checkTask, updateTasks}) {
    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks} checkTask={checkTask} updateTasks={updateTasks} />
        </div>
    )
}