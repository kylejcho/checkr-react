import React, { useMemo, useState } from 'react'
import SubGroup from '../SubGroup';
import { LayoutGroup, motion } from 'framer-motion';
import { isToday, isTomorrow, isAfter, addDays} from "date-fns";

export default function TasksContainer({ tasks, updateTasks }) {
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
            <LayoutGroup>
                <SubGroup subTasks={todayTasks} allTasks={tasks} updateTasks={updateTasks} type="today" />
                <SubGroup subTasks={tomorrowTasks} allTasks={tasks} updateTasks={updateTasks} type="tomorrow" />
                <SubGroup subTasks={upcomingTasks} allTasks={tasks} updateTasks={updateTasks} type="upcoming" />
            </LayoutGroup>
        </motion.div> 
    )
}