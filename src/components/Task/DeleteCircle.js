import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle({taskContainer, removeTask }) {
    function handleClick() {
        taskContainer.current.style.opacity = '0';
        setTimeout(() => {
            removeTask(taskContainer.current.id)
        }, 200);
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}