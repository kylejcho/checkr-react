import React from "react";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle( {tasks, task, removeTask} ) {
    function handleClick() {
        console.log('Delete clicked ' + task.current.id);
    
        removeTask(task.current.id);
            

        //task.current.remove();
    }
    
    return (
        <div className="deleteContainer" onClick={handleClick}>
            <DeleteCircleIcon />
        </div>
    )
}