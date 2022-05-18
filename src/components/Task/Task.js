import React, { useRef, useState, useCallback } from "react";
import CheckCircle from "./CheckCircle";
import { useMotionValue, Reorder, AnimatePresence, motion } from "framer-motion";
import { RaisedShadow } from "./RaisedShadow";
import TaskView from "./TaskView";

function Task({ task, subTasks, updateSubTasks, viewTask, openTask }) {
    const [showTask, setShowTask] = useState(true)
    const [complete, setComplete] = useState(task.complete)
    const taskContainer = useRef();
    
    const checkTask = () => {
        let prevTasks = [...subTasks];
        const checkedTask = prevTasks.find(item => item.id === task.id);
        checkedTask.complete = !checkedTask.complete;
        const index = prevTasks.indexOf(checkedTask);
        if (checkedTask.complete) {
          prevTasks.push(prevTasks.splice(index,1)[0])
        } else {
          prevTasks.unshift(prevTasks.splice(index,1)[0])
        }
        updateSubTasks(prevTasks)
    }

    const removeTask = useCallback((task) => {
        updateSubTasks(subTasks.filter(item => item.id !== task))
      },[subTasks]); 

    const checkClickAnimation = () =>  {
        setComplete(!complete)
    }

    function handleDeleteClick() {
        if (openTask) {
            setTimeout(() => {
                viewTask(null)
            }, 0);
        }
        setTimeout(() => {
            setShowTask(false)
        }, 0);
        setTimeout(() => {removeTask(taskContainer.current.id)}, 250); 
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
                        }}
                        onDragEnd={()=>{
                            updateSubTasks(subTasks)
                            taskContainer.current.classList.remove('dragging');
                        }}
                        exit={{opacity: 0, transition: {duration: 0.3}}}
                        dragTransition={{ bounceStiffness: 1000, bounceDamping:70 }}
                        onClick={(e)=> {
                            e.stopPropagation()
                            updateSubTasks(subTasks)
                            viewTask(task)
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
            <AnimatePresence exitBeforeEnter>
                {openTask && openTask.id === task.id && (
                    <TaskView openTask={openTask} checkTask={checkTask} task={task} taskContainer={taskContainer} complete={complete} checkClickAnimation={checkClickAnimation} />
                )}    
            </AnimatePresence>
        </>
    )
}

export default React.memo(Task)