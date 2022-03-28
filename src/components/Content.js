import React from "react";
import TasksContainer from "./Task/TasksContainer";

export default function Content({ tasks, checkTask, removeTask }) {
    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks} checkTask={checkTask} removeTask={removeTask}/>
        </div>
    )
}