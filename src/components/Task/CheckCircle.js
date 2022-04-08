import React, { useEffect, useState } from "react";
import { ReactComponent as CheckCircleEmptyIcon } from "../../icons/checkCircleEmpty.svg"
import { ReactComponent as CheckCircleIcon } from "../../icons/checkmark-circle.svg"

export default function CheckCircle({ task, taskContainer, type, checkTask }) {
    useEffect(()=>{
        taskContainer.current.classList.toggle('completed', task.complete);
    },[])

    function handleClick() {
        checkTask(taskContainer.current.id);
        taskContainer.current.classList.toggle('completed')
    }
    
    return (
        <div className="checkContainer" onClick={handleClick}>
            {task.complete ? <CheckCircleIcon /> : <CheckCircleEmptyIcon />}
        </div>
    )
}