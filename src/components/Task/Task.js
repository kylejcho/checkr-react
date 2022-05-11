import React, { useRef, useState } from "react";
import CheckCircle from "./CheckCircle";
import { useMotionValue, Reorder, AnimatePresence, motion } from "framer-motion";
import { RaisedShadow } from "./RaisedShadow";
import TaskView from "./TaskView";

export default function Task({ task, tasks, checkTask, removeTask, updateTasks, viewTask, constraintsRef, openTask }) {
    const [showTask, setShowTask] = useState(true)
    const [complete, setComplete] = useState(task.complete)
    const [dragging, setDragging] = useState(false)
    const taskContainer = useRef();
    
    function checkClickAnimation() {
        setComplete(!complete)
    }

    function handleDeleteClick() {
        setShowTask(false)
        setTimeout(() => removeTask(taskContainer.current.id), 150); 
    }

    const y = useMotionValue(0);
    const boxShadow = RaisedShadow(y);

    return (
        <>
            <AnimatePresence>
                {showTask && (
                    <Reorder.Item 
                        id={task.id} 
                        ref={taskContainer}
                        className={`taskContainer ${openTask && task.id === openTask.id && 'viewing'}`}
                        value={task} 
                        style={{boxShadow, y}}
                        whileDrag={{scale:1.04}}
                        transition={{duration: 0.25}}
                        onDragStart={()=>{
                            taskContainer.current.classList.add('dragging')
                            setDragging(true)
                        }}
                        onDragEnd={()=>{
                            updateTasks(tasks)
                            taskContainer.current.classList.remove('dragging');
                            setTimeout(() => setDragging(false), 100);
                        }}
                        exit={{opacity: 0, transition: {duration: 0.3}}}
                        dragTransition={{ bounceStiffness: 1000, bounceDamping:70 }}
                        onClick={(e)=> {
                            if (dragging) return
                            e.stopPropagation()
                            viewTask(task)
                            setTimeout(() => {
                               const tasksContainer = document.querySelector('.tasksContainer')
                            }, 100);
                        }}
                    >
                        <CheckCircle task={task} taskContainer={taskContainer} checkTask={checkTask} complete={complete} checkClickAnimation={checkClickAnimation} />
                        <div className="nameContainer">
                            {task.name}
                        </div>
                        <div className="deleteContainer" 
                            onClick={(e)=> {
                                handleDeleteClick()
                                e.stopPropagation();
                            }}>
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
            <TaskView openTask={openTask} checkTask={checkTask} task={task} taskContainer={taskContainer} complete={complete} checkClickAnimation={checkClickAnimation} />
        </>
    )
}