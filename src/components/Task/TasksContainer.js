import React, { useState, useEffect, useCallback, useRef} from 'react'
import SubGroup from '../SubGroup';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { isToday, isTomorrow, isAfter, addDays, endOfDay} from "date-fns";

export default function TasksContainer({ contentType, tasks, updateTasks, removeTask, checkTask, viewTask, openTask }) {
    const [todayTasks, setTodayTasks] = useState([])
    const [tomorrowTasks, setTomorrowTasks] = useState([])
    const [upcomingTasks, setUpcomingTasks] = useState([])
    
    const updateTodayTasks = useCallback((subTasks) =>{
        setTodayTasks(subTasks)
    },[])

    const updateTomorrowTasks = useCallback((subTasks) =>{
        setTomorrowTasks(subTasks)
    },[])

    const updateUpcomingTasks = useCallback((subTasks) =>{
        setUpcomingTasks(subTasks)
    },[])

    useEffect(() => {
        setTodayTasks(tasks.filter(task=> isToday(task.dueDate)))
        setTomorrowTasks(tasks.filter(task=> isTomorrow(task.dueDate)))
        setUpcomingTasks(tasks.filter(task=> isAfter(task.dueDate, addDays(endOfDay(new Date()),1))))
    },[tasks])
    const firstRender = useRef(true);
    useEffect(() => {
        setTimeout(() => {
            if (firstRender.current) {
                 firstRender.current = false;
                 return;
            }
        }, 450);
    });

    const today = () => <SubGroup subTasks={todayTasks} updateSubTasks={updateTodayTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="today" />

    const all = () => {
        return (
            <>
                <motion.div layout className="subGroupTitle" transition={{duration: firstRender.current ? 0 : 0.25}} >Today</motion.div>
                <SubGroup subTasks={todayTasks} updateSubTasks={updateTodayTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="today" />
                <motion.div layout className="subGroupTitle" transition={{duration: firstRender.current ? 0 : 0.25}} >Tomorrow</motion.div>
                <SubGroup subTasks={tomorrowTasks} updateSubTasks={updateTomorrowTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="tomorrow" />
                <motion.div layout className="subGroupTitle" transition={{duration: firstRender.current ? 0 : 0.25}} >Upcoming</motion.div>
                <SubGroup subTasks={upcomingTasks} updateSubTasks={updateUpcomingTasks} updateTasks={updateTasks} removeTask={removeTask} checkTask={checkTask} viewTask={viewTask} openTask={openTask} type="upcoming" />
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
                initial={{
                    opacity: 0, 
                    y: '25vh',
                    x: '150%'
                }}
                exit={{
                    opacity: 0, 
                    transition: {
                        duration: 0.25
                    }
                }}
                animate={{
                    y: 0,
                    x: openTask ? '100%': '150%',
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
                <LayoutGroup>
                    <div id="titleContainer" className="tasksTitle">
                        {taskTitle()}
                    </div>
                    {contentType === 'today' ? today() : all()}
                </LayoutGroup>
            </motion.div> 
        </AnimatePresence>
    )
}