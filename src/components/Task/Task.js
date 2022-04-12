import React, { useRef, useState, useEffect } from "react";
import CheckCircle from "./CheckCircle";
import { motion, Reorder, AnimatePresence} from "framer-motion";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function Task({ task, checkTask, removeTask, type }) {
    const [showTask, setShowTask] = useState(true)
    const taskContainer = useRef();
    
    function handleDeleteClick() {
        setShowTask(false)
        setTimeout(() => removeTask(taskContainer.current.id), 110); 
    }

    return (
        <AnimatePresence>
            {showTask && (
                <Reorder.Item 
                    id={task}
                    value={task} 
                    whileDrag={{scale: 1.04}}
                    transition={{duration: 0.3}}
                    exit={{opacity: 0, transition: {duration: 0.15}}}
                >
                    <motion.div 
                        layout 
                        id={task.id} 
                        ref={taskContainer}
                        className="taskContainer" 
                        whileHover={{boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.17)"}}
                        whileTap={()=>taskContainer.current.classList.add('dragging')}
                        onMouseUp={()=>taskContainer.current.classList.remove('dragging')}
                    >
                        <CheckCircle task={task} taskContainer={taskContainer} type={type} checkTask={checkTask} />
                        <motion.div className="nameContainer">{task.name}</motion.div>
                        <div className="deleteContainer" onClick={handleDeleteClick}>
                            <DeleteCircleIcon />
                        </div>
                        <div className="descriptionContainer">{task.description}</div>
                    </motion.div>
                </Reorder.Item>
            )}
        </AnimatePresence>
    )
}

