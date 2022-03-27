import React, { useRef } from "react";
import CheckCircle from "./CheckCircle";
import DeleteCircle from "./DeleteCircle";

export default function Task({ task }) {
    const id = useRef();

    function handleAddTaskClick() {
        console.log(id.current.id)
    }

    return (
        <div className="taskContainer" id={task.id} style={{opacity:'1'}} onClick={handleAddTaskClick} ref={id}>
            <CheckCircle task={id} />
            <div className="nameContainer">{task.name}</div>
            <DeleteCircle task={id} />
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