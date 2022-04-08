import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle({taskContainer, removeTask }) {
    function handleClick() {
        taskContainer.current.style.transition = "ease-in-out 0.2s all";
        taskContainer.current.style.opacity = '0';
        setTimeout(()=> removeTask(taskContainer.current.id), 150);
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}