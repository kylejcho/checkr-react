import React from "react";
import { ReactComponent as CheckCircleEmptyIcon } from "../../icons/checkCircleEmpty.svg"

export default function CheckCircle({tasks, task} ) {
    function handleClick() {
        console.log('Check clicked ' + task.current.id)
    }

    return (
        <div className="checkContainer" onClick={handleClick}>
            <CheckCircleEmptyIcon />
        </div>
    )
}