import React from "react";
import CheckCircle from "./CheckCircle";
import DeleteCircle from "./DeleteCircle";

export default function Task({ task }) {
    return (
        <div className="taskContainer" id={task.id} style={{opacity: '1'}}>
            <CheckCircle />
            <div className="nameContainer">{task.name}</div>
            <DeleteCircle />
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