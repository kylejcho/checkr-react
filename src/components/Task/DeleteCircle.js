import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle({ task, removeTask }) {
    function handleClick() {
        removeTask(task.current.id)
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}