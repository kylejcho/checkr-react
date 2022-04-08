import React from 'react'
import SubGroup from '../SubGroup';
import { motion } from 'framer-motion';

export default function TasksContainer({ tasks, checkTask, removeTask, reorderTasks}) {
    const slideUp = {
        initial: {
            opacity: 0,
            y: '30vh'
        },
        animate: {
            opacity: 1,
            y: '0',
            transition: {
                duration: 0.3,
                type: "spring",
                damping: 30,
                stiffness: 400,
            }
        },
        exit: {
            opacity: 0
        }
    }

    return (
        <motion.div 
            className="tasksContainer" 
            id="homeContainer"
            variants={slideUp}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
            <SubGroup tasks={tasks} checkTask={checkTask} removeTask={removeTask} reorderTasks={reorderTasks} type="today" />
            <SubGroup tasks={tasks} checkTask={checkTask} removeTask={removeTask} reorderTasks={reorderTasks} type="tomorrow" />
            <SubGroup tasks={tasks} checkTask={checkTask} removeTask={removeTask} reorderTasks={reorderTasks} type="upcoming" />
        </motion.div> 
    )
}