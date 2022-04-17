import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle({taskContainer, removeTask }) {
    function handleClick() {
        //taskContainer.current.style.
        removeTask(taskContainer.current.id)
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}