import React from 'react'
import SubGroup from '../SubGroup';
import { motion } from 'framer-motion';
import { isToday, isTomorrow, isAfter, addDays} from "date-fns";

export default function TasksContainer({ tasks, checkTask, removeTask }) {
    const todayTasks = tasks.filter(task=> isToday(task.dueDate))
    const tomorrowTasks = tasks.filter(task=> isTomorrow(task.dueDate))
    const upcomingTasks = tasks.filter(task=> isAfter(task.dueDate, addDays(new Date(),1)))

    return (
        <motion.div 
            id="homeContainer"
            className="tasksContainer" 
            initial={{opacity: 0, y: '30vh'}}
            exit={{opacity: 0, y: '120vh'}}
            animate={{
                y: '0',
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3
                }
             }}
        >
            <div id="titleContainer" className="tasksTitle">Good Afternoon, User</div>
            <SubGroup subTasks={todayTasks} tasks={tasks} checkTask={checkTask} removeTask={removeTask} type="today" />
            <SubGroup subTasks={tomorrowTasks} tasks={tasks} checkTask={checkTask} removeTask={removeTask} type="tomorrow" />
            <SubGroup subTasks={upcomingTasks} tasks={tasks} checkTask={checkTask} removeTask={removeTask} type="upcoming" />
        </motion.div> 
    )
}