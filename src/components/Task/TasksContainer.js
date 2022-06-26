import React, { useState, useEffect, useCallback, useRef, useTransition } from 'react'
import SubGroup from '../SubGroup'
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion'
import { isToday, isTomorrow, isAfter, addDays, endOfDay, getHours } from 'date-fns'
import { UserAuth } from '../../contexts/AuthContext'
import { auth } from '../../firebase'
import { updateProfile, onAuthStateChanged } from 'firebase/auth'

export default function TasksContainer({
   contentType,
   dataArr,
   updateTasks,
   addedTask,
   removeTask,
   deleteTask,
   checkTask,
   viewTask,
   openTask,
   openTaskView,
}) {
   const { name } = UserAuth()
   const [isPending, startTransition] = useTransition()

   const [todayTasks, setTodayTasks] = useState(
      dataArr.filter(task => isToday(task.dueDate))
   )
   const [tomorrowTasks, setTomorrowTasks] = useState(
      dataArr.filter(task => isTomorrow(task.dueDate))
   )
   const [upcomingTasks, setUpcomingTasks] = useState(
      dataArr.filter(task => isAfter(task.dueDate, addDays(endOfDay(new Date()), 1)))
   )

   const updateTodayTasks = useCallback(subTasks => {
      setTodayTasks(subTasks)
      startTransition(() => {
         updateTasks(subTasks)
      })
   }, [])

   const updateTomorrowTasks = useCallback(subTasks => {
      setTomorrowTasks(subTasks)
      startTransition(() => {
         updateTasks(subTasks)
      })
   }, [])

   const updateUpcomingTasks = useCallback(subTasks => {
      setUpcomingTasks(subTasks)
      startTransition(() => {
         updateTasks(subTasks)
      })
   }, [])

   useEffect(() => {
      if (addedTask && isToday(addedTask.dueDate)) {
         setTodayTasks(prevTodayTasks => [addedTask, ...prevTodayTasks])
      } else if (addedTask && isTomorrow(addedTask.dueDate)) {
         setTomorrowTasks(prevTomorrowTasks => [addedTask, ...prevTomorrowTasks])
      } else if (
         addedTask &&
         isAfter(addedTask.dueDate, addDays(endOfDay(new Date()), 1))
      ) {
         setUpcomingTasks(prevUpcomingTasks => [addedTask, ...prevUpcomingTasks])
      }
   }, [addedTask])

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
      setTimeout(() => {
         if (firstRender.current) {
            firstRender.current = false
            return
         }
      }, 450)
   })

   const today = () => (
      <SubGroup
         subTasks={todayTasks}
         contentType={contentType}
         updateSubTasks={updateTodayTasks}
         updateTasks={updateTasks}
         removeTask={removeTask}
         deleteTask={deleteTask}
         checkTask={checkTask}
         viewTask={viewTask}
         openTaskView={openTaskView}
         type='today'
      />
   )

   const all = () => {
      return (
         <>
            <motion.div
               className='subGroupTitle'
               transition={{ duration: firstRender.current ? 0 : 0.25 }}
            >
               Today
            </motion.div>
            <SubGroup
               subTasks={todayTasks}
               contentType={contentType}
               updateSubTasks={updateTodayTasks}
               updateTasks={updateTasks}
               removeTask={removeTask}
               deleteTask={deleteTask}
               checkTask={checkTask}
               viewTask={viewTask}
               openTaskView={openTaskView}
               type='today'
            />
            <motion.div
               layout
               className='subGroupTitle'
               transition={{ duration: firstRender.current ? 0 : 0.25 }}
            >
               Tomorrow
            </motion.div>
            <SubGroup
               subTasks={tomorrowTasks}
               contentType={contentType}
               updateSubTasks={updateTomorrowTasks}
               updateTasks={updateTasks}
               removeTask={removeTask}
               deleteTask={deleteTask}
               checkTask={checkTask}
               viewTask={viewTask}
               openTaskView={openTaskView}
               type='tomorrow'
            />
            <motion.div
               layout
               className='subGroupTitle'
               transition={{ duration: firstRender.current ? 0 : 0.25 }}
            >
               Upcoming
            </motion.div>
            <SubGroup
               subTasks={upcomingTasks}
               contentType={contentType}
               updateSubTasks={updateUpcomingTasks}
               updateTasks={updateTasks}
               removeTask={removeTask}
               deleteTask={deleteTask}
               checkTask={checkTask}
               viewTask={viewTask}
               openTaskView={openTaskView}
               type='upcoming'
            />
         </>
      )
   }

   function homeGreeting() {
      if (isMorning()) {
         return 'Good Morning, '
      } else if (isAfternoon()) {
         return 'Good Afternoon, '
      } else {
         return 'Good Evening, '
      }
   }

   const taskTitle = () => {
      if (contentType === 'home') {
         return homeGreeting() + auth.currentUser.displayName
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
               x: openTask ? '50%' : '100%',
               opacity: 1,
               transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                  duration: 0.25,
               },
            }}
            onClick={e => {
               e.stopPropagation()
            }}
         >
            <LayoutGroup>
               <div id='titleContainer' className='tasksTitle'>
                  {taskTitle()}
               </div>
               {contentType === 'today' ? today() : all()}
            </LayoutGroup>
         </motion.div>
      </AnimatePresence>
   )
}

const isMorning = () => {
   if (getHours(new Date()) < 12) {
      return true
   }
}

const isAfternoon = () => {
   if (getHours(new Date()) >= 12 && getHours(new Date()) < 18) {
      return true
   }
}
