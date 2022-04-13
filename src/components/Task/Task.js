import React, { useRef, useState } from "react";
import CheckCircle from "./CheckCircle";
import { motion, useMotionValue, Reorder, AnimatePresence} from "framer-motion";
import { RaisedShadow } from "./RaisedShadow";
import { ReactComponent as DeleteCircleIcon } from "../../icons/deleteCircle.svg";

export default function Task({ task, checkTask, removeTask }) {
    const [showTask, setShowTask] = useState(true)
    const taskContainer = useRef();
    
    function handleDeleteClick() {
        setShowTask(false)
        setTimeout(() => removeTask(taskContainer.current.id), 150); 
    }

    const y = useMotionValue(0);
    const boxShadow = RaisedShadow(y);

    return (
        <AnimatePresence>
            {showTask && (
                <Reorder.Item 
                    id={task}
                    value={task} 
                    style={{boxShadow, y}}
                    whileDrag={{scale:1.04}}
                    transition={{duration: 0.3}}
                    exit={{opacity: 0, transition: {duration: 0.3}}}
                >
                    <motion.div 
                        layout 
                        id={task.id} 
                        ref={taskContainer}
                        className="taskContainer" 
                        whileDrag={{backgroundColor:'#b4cfff'}}
                        whileHover={{
                            transition:{duration:0.2},
                            boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.17)"
                        }}
                        whileTap={()=>taskContainer.current.classList.add('dragging')}
                        onMouseUp={()=>taskContainer.current.classList.remove('dragging')}
                    >
                        <CheckCircle task={task} taskContainer={taskContainer} checkTask={checkTask} />
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

