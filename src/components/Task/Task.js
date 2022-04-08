import React, { useRef } from "react";
import CheckCircle from "./CheckCircle";
import DeleteCircle from "./DeleteCircle";
import { motion } from "framer-motion";

export default function Task({ tasks, task, checkTask, removeTask, type }) {
    const taskContainer = useRef();

    function handleAddTaskClick() {

    }

    return (
        <motion.div layout className="taskContainer" id={task.id}  onClick={handleAddTaskClick} ref={taskContainer}>
            <CheckCircle task={task} taskContainer={taskContainer} type={type} checkTask={checkTask} />
            <div className="nameContainer">{task.name}</div>
            <DeleteCircle taskContainer={taskContainer} removeTask={removeTask} />
            <div className="descriptionContainer">{task.description}</div>
        </motion.div>
    )
}

export function updateTaskPosition() {
    /*
    const subGroups = document.querySelectorAll('.subGroup');
    subGroups.forEach(subGroup=>{
        if (subGroup.children.length > 1) {
            let position = 0; 
            for (let i = 1; i < subGroup.children.length; i++) {
                subGroup.children[i].children[0].style.pointerEvents = 'none';
                subGroup.children[i].style.transform = `translateY(${position}px)`;
                position += 60;
                setTimeout(()=> subGroup.children[i].children[0].style.pointerEvents = 'auto', 500);
            }
        }
    })
    */
}

