import React from "react";
import TasksContainer from "./Task/TasksContainer";

export default function Content({ tasks, removeTask }) {
    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}