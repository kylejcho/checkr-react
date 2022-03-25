import React from "react";
import CheckCircle from "./CheckCircle";

export default function Task({ task }) {
    return (
        <div className="taskContainer" id={task.id} style={{opacity: '1'}}>
            <CheckCircle />
            <div className="nameContainer">{task.name}</div>
            <div className="deleteContainer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                    <title>ionicons-v5-m</title>
                    <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"></path>
                </svg>
            </div>
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