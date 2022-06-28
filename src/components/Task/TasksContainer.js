import React, { useState, useEffect, useCallback, useRef } from 'react'
import SubGroup from '../SubGroup'
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion'
import {
   isToday,
   isTomorrow,
   isAfter,
   isBefore,
   addDays,
   endOfDay,
   getHours,
} from 'date-fns'
import { UserAuth } from '../../contexts/AuthContext'
import { auth } from '../../firebase'
import { updateProfile, onAuthStateChanged } from 'firebase/auth'

export default function TasksContainer({
   contentType,
   tasksCopy,
   addedTask,
   removeTask,
   viewTask,
   taskOpened,
}) {
   const [todayTasks, setTodayTasks] = useState(
      tasksCopy.filter(task => isToday(task.dueDate))
   )
   const [tomorrowTasks, setTomorrowTasks] = useState(
      tasksCopy.filter(task => isTomorrow(task.dueDate))
   )
   const [upcomingTasks, setUpcomingTasks] = useState(
      tasksCopy.filter(task => isAfter(task.dueDate, addDays(endOfDay(new Date()), 1)))
   )

   const [lateTasks, setLateTasks] = useState(
      tasksCopy.filter(task => isBefore(task.dueDate, new Date()))
   )

   const updateTodayTasks = useCallback(subTasks => {
      setTodayTasks(subTasks)
   }, [])

   const updateTomorrowTasks = useCallback(subTasks => {
      setTomorrowTasks(subTasks)
   }, [])

   const updateUpcomingTasks = useCallback(subTasks => {
      setUpcomingTasks(subTasks)
   }, [])

   const updateLateTasks = useCallback(subTasks => {
      setLateTasks(subTasks)
   }, [])

   function subGroupType(type) {
      if (type === 'today') {
         return [todayTasks, updateTodayTasks]
      } else if (type === 'tomorrow') {
         return [tomorrowTasks, updateTomorrowTasks]
      } else if (type === 'late') {
         return [lateTasks, updateLateTasks]
      } else {
         return [upcomingTasks, updateUpcomingTasks]
      }
   }

   const subGroup = type => {
      const subGroupTasks = subGroupType(type)[0]
      const update = subGroupType(type)[1]
      return (
         <>
            {title(type, subGroupTasks)}
            <SubGroup
               tasksCopy={tasksCopy}
               subTasks={subGroupTasks}
               updateSubTasks={update}
               contentType={contentType}
               removeTask={removeTask}
               viewTask={viewTask}
            />
         </>
      )
   }

   function title(type, subGroupTasks) {
      if (subGroupTasks.length !== 0 || type !== 'late') {
         return (
            <motion.div
               layout
               className={'subGroupTitle'}
               id={type === 'late' ? 'late' : ''}
               transition={{ duration: firstRender.current ? 0 : 0.25 }}
            >
               {type[0].toUpperCase() + type.substring(1)}
            </motion.div>
         )
      }
   }

   function subGroups() {
      if (contentType === 'today') {
         return subGroup('today')
      } else if (contentType === 'week') {
         return (
            <>
               {subGroup('today')}
               {subGroup('tomorrow')}
               {subGroup('upcoming')}
            </>
         )
      } else {
         return (
            <>
               {subGroup('late')}
               {subGroup('today')}
               {subGroup('tomorrow')}
               {subGroup('upcoming')}
            </>
         )
      }
   }

   useEffect(() => {
      if (addedTask) {
         if (isToday(addedTask.dueDate)) {
            setTodayTasks(prevTodayTasks => [addedTask, ...prevTodayTasks])
         } else if (isTomorrow(addedTask.dueDate)) {
            setTomorrowTasks(prevTomorrowTasks => [addedTask, ...prevTomorrowTasks])
         } else {
            setUpcomingTasks(prevUpcomingTasks => [addedTask, ...prevUpcomingTasks])
         }
      }
   }, [addedTask])

   const { name } = UserAuth()
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
         if (currentUser) {
            updateProfile(auth.currentUser, { displayName: name })
         }
      })
      return () => unsubscribe()
   }, [name])

   const firstRender = useRef(true)
   useEffect(() => {
      setTimeout(() => (firstRender.current = false), 450)
   })

   return (
      <AnimatePresence exitBeforeEnter>
         <motion.div
            id='homeContainer'
            key={contentType}
            className='tasksContainer'
            initial={{
               opacity: 0,
               y: '25vh',
               x: '100%',
            }}
            exit={{
               opacity: 0,
               transition: {
                  duration: 0.25,
               },
            }}
            animate={{
               y: 0,
               x: taskOpened ? '50%' : '100%',
               opacity: 1,
               transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                  duration: 0.25,
               },
            }}
            onClick={e => e.stopPropagation()}
         >
            <LayoutGroup>
               <div id='titleContainer' className='tasksTitle'>
                  {taskTitle(contentType, auth.currentUser.displayName)}
               </div>
               {subGroups()}
            </LayoutGroup>
         </motion.div>
      </AnimatePresence>
   )
}

const isMorning = () => getHours(new Date()) < 12

const isAfternoon = () => getHours(new Date()) >= 12 && getHours(new Date()) < 18

function homeGreeting() {
   if (isMorning()) {
      return 'Good Morning, '
   } else if (isAfternoon()) {
      return 'Good Afternoon, '
   } else {
      return 'Good Evening, '
   }
}

const taskTitle = (contentType, name) => {
   if (contentType === 'home') {
      return homeGreeting() + name
   } else if (contentType === 'today') {
      return "Today's Tasks"
   } else if (contentType === 'week') {
      return 'Next 7 Days'
   } else if (contentType === 'all') {
      return 'All Tasks'
   } else {
      return contentType
   }
}
