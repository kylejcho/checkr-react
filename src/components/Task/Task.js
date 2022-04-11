import React, { useRef, useState } from "react";
import CheckCircle from "./CheckCircle";
import { motion, Reorder, AnimatePresence} from "framer-motion";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function Task({ task, checkTask, removeTask, type }) {
    const taskContainer = useRef();
    const [showTask, setShowTask] = useState(true)

    function handleDeleteClick() {
        setTimeout(() => removeTask(taskContainer.current.id), 110); 
        setShowTask(false)
    }

    const taskVariants = {
        hover: { boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.17)" }
    }

    const deleteVariants = {
        initial: { opacity: !task.complete && '0' },
        hover: { opacity: '1' },
        animate: { opacity: task.complete ? '1' : '0' }
    }

    return (
        <AnimatePresence>
            {showTask && (
                <Reorder.Item 
                    value={task} 
                    id={task}
                    transition={{duration: 0.3}}
                    initial="initial" 
                    whileHover="hover"
                    animate="animate"
                    exit={{ 
                        opacity: 0,
                        transition: {duration: 0.15}
                    }}
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
                            onClick={handleDeleteClick}
                            variants={deleteVariants}
                        >
                            <DeleteCircleIcon />
                        </motion.div>
                        <div className="descriptionContainer">{task.description}</div>
                    </motion.div>
                </Reorder.Item>
            )}
            

        </AnimatePresence>
    )
}

