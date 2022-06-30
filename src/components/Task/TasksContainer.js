import React, { useState, useEffect, useCallback, useRef } from 'react'
import SubGroup from '../SubGroup'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion'
import { UserAuth } from '../../contexts/AuthContext'
import {
   isToday,
   isTomorrow,
   isAfter,
   isBefore,
   addDays,
   endOfDay,
   getHours,
} from 'date-fns'

export default function TasksContainer({
   contentType,
   tasksCopy,
   addedTask,
   deleteTask,
   viewTask,
   taskOpened,
}) {
   //On first render, set SubGroup tasks based on dueDate of each task
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

   //Write user data for every change in any subtasks array
   useEffect(() => {
      //Spread each subtasks array into a single array
      writeUserData([...todayTasks, ...tomorrowTasks, ...upcomingTasks, ...lateTasks])
   }, [todayTasks, tomorrowTasks, upcomingTasks, lateTasks])

   //Set new SubGroup tasks state from updated array of subTasks
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

   //Return a unique SubGroup component
   function subGroup(type) {
      const subGroupTasks = subGroupType(type)[0]
      const update = subGroupType(type)[1]
      return (
         <>
            {subGroupTitle(type, subGroupTasks)}
            <SubGroup
               tasksCopy={tasksCopy}
               subTasks={subGroupTasks}
               updateSubTasks={update}
               deleteTask={deleteTask}
               contentType={contentType}
               viewTask={viewTask}
            />
         </>
      )
   }

   //Determine which array of subTasks is passed as props into a SubGroup component
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

   //Return Title only if it's not for an empty "late" SubGroup component
   function subGroupTitle(type, subGroupTasks) {
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

   //Returns a combonation of SubGroups based on the ContentType state
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

   //New addedTask state changes subTasks state
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

   const { user } = UserAuth()

   //Prevent layout animation of subGroup titles right after first render
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
                  {taskTitle(contentType, user.displayName)}
               </div>
               {subGroups()}
            </LayoutGroup>
         </motion.div>
      </AnimatePresence>
   )
}

//Return greeting for homepage
function homeGreeting() {
   if (isMorning()) {
      return 'Good Morning, '
   } else if (isAfternoon()) {
      return 'Good Afternoon, '
   } else {
      return 'Good Evening, '
   }
}

//Determine morning, afternoon, evening based on current time
const isMorning = () => getHours(new Date()) < 12
const isAfternoon = () => getHours(new Date()) >= 12 && getHours(new Date()) < 18

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

const writeUserData = updatedTasks => {
   console.log(updatedTasks)
   setDoc(doc(db, `${auth.currentUser.uid}`, 'tasks'), {
      tasks: [...updatedTasks],
   })
}
