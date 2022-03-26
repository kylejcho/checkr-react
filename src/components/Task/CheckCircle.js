import React from "react";
import { ReactComponent as CheckCircleEmptyIcon } from "../../icons/checkCircleEmpty.svg"


export default function CheckCircle({tasks, task, type, removeTask} ) {
    function handleClick() {
        console.log('Check clicked ' + task.current.id)
        checkAnimation(task)
    }

    function checkAnimation(task) {
        const subGroups = document.querySelectorAll('.subGroup');
        let subLength;
        let subGroup;
        subGroups.forEach(sub=>{
            if (sub.id === type) {
                subGroup = sub;
                subLength = sub.children.length-1;
                return
            }
        })

        let startingPoint;
        for (let i = 1; i < subGroup.children.length; i++) {
            if (task.current === subGroup.children[i]) {
                startingPoint = i;
                console.log(startingPoint)
            }
        }

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
        }, 0);


    

    }

    return (
        <div className="checkContainer" onClick={handleClick}>
            <CheckCircleEmptyIcon />
        </div>
    )
}

