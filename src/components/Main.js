import React from "react";
import TasksContainer from "./TasksContainer";


export default function Main({ tasks }) {
    return (
        <div id="contentContainer">
            <TasksContainer tasks={tasks}/>
        </div>
    )
}