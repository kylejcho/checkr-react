import React, { useRef } from "react";
import CheckCircle from "./CheckCircle";
import DeleteCircle from "./DeleteCircle";

export default function Task({ tasks, task, removeTask, type }) {
    const id = useRef();

    function handleAddTaskClick() {
        
    }

    return (
        <div className="taskContainer" id={task.id}  onClick={handleAddTaskClick} ref={id}>
            <CheckCircle tasks={tasks} task={id} type={type} removeTask={removeTask}/>
            <div className="nameContainer">{task.name}</div>
            <DeleteCircle tasks={tasks} task={id} removeTask={removeTask} />
            <div className="descriptionContainer">{task.description}</div>
        </div>
    )
}

export function updateTaskPosition() {
    const subGroups = document.querySelectorAll('.subGroup');
    subGroups.forEach(subGroup=>{
        if (subGroup.children.length > 1) {
            let position = 0; 
            for (let i = 1; i < subGroup.children.length; i++) {
                subGroup.children[i].style.transform = `translateY(${position}px)`
                position += 60;
            }
        }
    })
}