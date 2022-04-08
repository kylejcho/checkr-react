import React, { useEffect, useState } from "react";
import { ReactComponent as CheckCircleEmptyIcon } from "../../icons/checkCircleEmpty.svg"
import { ReactComponent as CheckCircleIcon } from "../../icons/checkmark-circle.svg"

export default function CheckCircle({ task, taskContainer, checkTask }) {
    useEffect(()=>{
        taskContainer.current.classList.toggle('completed', task.complete);
    },[])

    function handleClick() {
        checkTask(taskContainer.current.id);
        setTimeout(()=>taskContainer.current.classList.toggle('completed'),0); 
    }
    
    return (
        <div className="checkContainer" onClick={handleClick}>
            {task.complete ? <CheckCircleIcon /> : <CheckCircleEmptyIcon />}
        </div>
    )
}