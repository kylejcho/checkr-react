import React from 'react'
import SubGroup from '../SubGroup';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { isToday, isTomorrow, isAfter, addDays} from "date-fns";

export default function TasksContainer({ contentType, tasks, updateTasks, removeTask, checkTask, viewTask, openTask }) {
    const todayTasks = tasks.filter(task=> isToday(task.dueDate))
    const tomorrowTasks = tasks.filter(task=> isTomorrow(task.dueDate))
    const upcomingTasks = tasks.filter(task=> isAfter(task.dueDate, addDays(new Date(),1)))

    const today = () => <SubGroup subTasks={todayTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="today" />

    const all = () => {
        return (
            <>
                <SubGroup subTasks={todayTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="today" />
                <SubGroup subTasks={tomorrowTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="tomorrow" />
                <SubGroup subTasks={upcomingTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="upcoming" />
            </>
        )
    }

    const taskTitle = () => {
        if (contentType === 'home') {
            return 'Good Afternoon, User'
        } else if (contentType === 'today') {
            return "Today's Tasks"
        } else if (contentType === 'week') {
            return 'Next 7 Days'
        } else if (contentType === 'all') {
            return 'All Tasks'
        }
    }


    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div 
                id="homeContainer"
                key = {contentType}
                className="tasksContainer" 
                initial={{opacity: 0, y: '25vh'}}
                exit={{
                    opacity: 0, 
                    transition: {
                        duration: 0.25
                    }
                }}
                animate={{
                    y: '0',
                    x: openTask ? -180: 0,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        duration: 0.25
                    }
                }}
                onClick={(e)=>{
                    e.stopPropagation();
                }}
            >
                <div id="titleContainer" className="tasksTitle">
                    {taskTitle()}
                </div>
                <LayoutGroup>
                    {contentType === 'today' ? today() : all()}
                </LayoutGroup>
            </motion.div> 
        </AnimatePresence>
    )
}