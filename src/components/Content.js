import React from "react";
import TasksContainer from "./Task/TasksContainer";
import TaskView from "./Task/TaskView";
export default function Content({ tasks, checkTask }) {
    const hello = <TaskView task={tasks[1]}/>
    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks} checkTask={checkTask} />
        </div>
    )
}