import React, { useEffect, useState } from "react";
import { ReactComponent as CheckCircleEmptyIcon } from "../../icons/checkCircleEmpty.svg"
import { ReactComponent as CheckCircleIcon } from "../../icons/checkmark-circle.svg"

export default function CheckCircle({ task, taskContainer, type, checkTask }) {
    const [complete, setComplete] = useState(task.complete);

    useEffect(()=>{
        taskContainer.current.classList.toggle('completed', task.complete);
    },[task.complete])

    function handleClick() {
        checkTask(taskContainer.current.id)
        checkAnimation(taskContainer, type);
    }

    return (
        <div className="checkContainer" onClick={handleClick}>
            { complete ? <CheckCircleIcon /> : <CheckCircleEmptyIcon />}
        </div>
    )
}

function checkAnimation(task, type) {
    const subGroups = document.querySelectorAll('.subGroup');
    let subLength;
    let subGroup;
    subGroups.forEach(sub=>{
        if (sub.id === type) {
            subGroup = sub;
            subLength = sub.children.length-1;
        }
    })

    let startingPoint;
    for (let i = 1; i < subGroup.children.length; i++) {
        if (task.current === subGroup.children[i]) {
            startingPoint = i;
        }
    }

    task.current.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
        task.current.style.transform = `translate(0,${(subLength-1)*60}px)`
        let distance;
        if (startingPoint === 1) {
            distance = 0;
        } else {
            distance = startingPoint * 60 - 60;
        }
        for (let i = startingPoint + 1; i < subGroup.children.length; i++) {
            subGroup.children[i].style.transform = `translateY(${distance}px)`;
            distance += 60;
        }    
    }, 300);

    setTimeout(() => {
        subGroup.append(task.current);
        task.current.style.transition = 'all ease-in-out 0.2s';
    }, 600);
}