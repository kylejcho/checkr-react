import React from "react";
import { motion } from "framer-motion";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function DeleteCircle({ taskContainer, removeTask, variants }) {
    function handleClick() {
        taskContainer.current.style.transition = "ease-in-out 0.2s all";
        taskContainer.current.style.opacity = '0';
        setTimeout(()=> removeTask(taskContainer.current.id), 150);
    }
    
    return (
        <motion.div 
            className="deleteContainer" 
            onClick={handleClick}
        >
            <DeleteCircleIcon />
        </motion.div>
    )
}