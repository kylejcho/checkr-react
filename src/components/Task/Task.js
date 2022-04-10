import React, { useRef, useState } from "react";
import CheckCircle from "./CheckCircle";
import DeleteCircle from "./DeleteCircle";
import { motion, Reorder } from "framer-motion";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function Task({ task, checkTask, removeTask, type }) {
    const taskContainer = useRef();

    function handleClick() {
        taskContainer.current.style.transition = "ease-in-out 0.2s all";
        taskContainer.current.style.opacity = '0';
        setTimeout(()=> removeTask(taskContainer.current.id), 150);
    }

    const taskVariants = {
        initial: {boxShadow: "none"},
        hover: {boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.17)"}
    }

    const deleteVariants = {
        initial: { opacity: !task.complete && '0' },
        hover: { opacity: '1' },
        animate: { opacity: task.complete ? '1' : '0' }
    }

    return (
        <Reorder.Item 
            value={task} 
            id={task}
            transition={{duration: 0.4}}
            initial="initial" 
            whileHover="hover"
            animate="animate"
        >
            <motion.div 
                layout 
                id={task.id} 
                className="taskContainer" 
                ref={taskContainer}
                variants={taskVariants}
            >
                <CheckCircle task={task} taskContainer={taskContainer} type={type} checkTask={checkTask} />
                <div className="nameContainer">{task.name}</div>
                <motion.div 
                    className="deleteContainer" 
                    onClick={handleClick}
                    variants={deleteVariants}
                >
                    <DeleteCircleIcon />
                </motion.div>
                <div className="descriptionContainer">{task.description}</div>
            </motion.div>
        </Reorder.Item>
    )
}

