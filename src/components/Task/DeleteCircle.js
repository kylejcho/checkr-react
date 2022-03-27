import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle( {task} ) {
    function handleClick() {
        console.log('Delete clicked ' + task.current.id);
        task.current.remove()
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}