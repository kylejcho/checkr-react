import React, { useRef, useState } from "react";
import CheckCircle from "./CheckCircle";
import { motion, useMotionValue, Reorder, AnimatePresence} from "framer-motion";
import { RaisedShadow } from "./RaisedShadow";

function Task({ task, checkTask, removeTask }) {
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
                    id={task.id} 
                    ref={taskContainer}
                    className="taskContainer" 
                    value={task} 
                    style={{boxShadow, y}}
                    whileDrag={{scale:1.04}}
                    transition={{duration: 0.3}}
                    onDragStart={()=>taskContainer.current.classList.add('dragging')}
                    onDragEnd={()=>taskContainer.current.classList.remove('dragging')}
                    exit={{opacity: 0, transition: {duration: 0.3}}}
                >
                        <CheckCircle task={task} taskContainer={taskContainer} checkTask={checkTask} />
                        <div className="nameContainer">{task.name}</div>
                        <div className="deleteContainer" onClick={handleDeleteClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                                <title>ionicons-v5-l</title>
                                <line x1="368" y1="368" x2="144" y2="144" 
                                    style={{fill:'none',stroke:'#697384',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}
                                />
                                <line x1="368" y1="144" x2="144" y2="368" 
                                    style={{fill:'none',stroke:'#697384',strokeLinecap:'round',strokeLinejoin:'round',strokeWidth:'32px'}}
                                />
                            </svg>
                        </div>
                        <div className="descriptionContainer">{task.description}</div>
       
                </Reorder.Item>
            )}
        </AnimatePresence>
    )
}

export default React.memo(Task)