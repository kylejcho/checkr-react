import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle({ task, removeTask }) {
    function handleClick() {
        deleteAnimation(task.current)
        removeTask(task.current.id)
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}

function deleteAnimation(task) {
    task.style.opacity = "0"
}