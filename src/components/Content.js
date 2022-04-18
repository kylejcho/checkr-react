import React from "react";
import TasksContainer from "./Task/TasksContainer";
export default function Content({ tasks, checkTask }) {
    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks} checkTask={checkTask} />
        </div>
    )
}