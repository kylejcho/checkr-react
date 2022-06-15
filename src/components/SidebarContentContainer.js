import React, { useEffect, useState, useCallback } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function SidebarContentContainer() {
   //Master list of users tasks and is updated whenever an update needs to be sent to FireStore database
   const [tasks, setTasks] = useState(null)

   const [uniqueLists, setUniqueLists] = useState([])

   //Determines whether a task is open in taskView mode within the content container
   const [openTask, setOpenTask] = useState(null)

   //State is set to current content path
   const [contentType, setContentType] = useState('home')

   useEffect(() => {
      if (tasks) {
         updateUniqueLists()
      }
   }, [tasks])

   const updateUniqueLists = () => {
      setUniqueLists([...new Set(tasks.map((task) => task.list))])
   }

   const viewTask = useCallback((task) => {
      setOpenTask(task)
   }, [])

   //Set new 'contentType' state with given 'type'
   //OpenTask state must be set to null to insure taskViewContainer is not present during content change
   const changeContent = useCallback((type) => {
      setContentType(type)
      setOpenTask(null)
   }, [])

   //Tasks state is updated with the same array except the task that is to be deleted
   //Filter through task 'id' properties to determine which task object to delete
   const removeTask = useCallback((task) => {
      setTasks((tasks) => tasks.filter((item) => item.id !== task))
   }, [])

   //Subgroup changes are updated to the master 'tasks' list
   //Prevents unecessary rerender to all task components whenever a layout change is made with a subgroup
   const updateTasks = useCallback(
      (subTasks) => {
         const prevTasks = tasks.filter((task) => !subTasks.includes(task))
         setTasks([...prevTasks, ...subTasks])
      },
      [tasks]
   )

   //On first mount, user's data collection is requested from Firebase
   const data = async () => {
      const arr = []

      const querySnapshot = await getDocs(
         collection(db, `${auth.currentUser.uid}`)
      )

      //Tasks in JSON data will be turned into JS task objects
      //Pushed into a new array
      querySnapshot.forEach((doc) => {
         const task = {
            name: doc.data().name,
            description: doc.data().description,
            dueDate: doc.data().dueDate.toDate(),
            list: doc.data().list,
            complete: doc.data().complete,
            id: doc.data().id,
         }
         arr.push(task)
      })

      //'Tasks' state is set to be the new array of tasks.
      setTasks([...arr])
   }

   //Only get data from firebase once user authentification state has changed
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         if (currentUser)
            setTimeout(() => {
               data()
            }, 200)
      })
      return unsubscribe()
   }, [])

   //useEffect(() => hideScroll(), [contentType])

   //Only render content if user is logged in and tasks state is set

   return (
      <>
         <AnimatePresence exitBeforeEnter>
            {!tasks && (
               <motion.div
                  id='loadingScreen'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6 }}
               >
                  <div id='loadingScreenLogoContainer'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='512'
                        height='512'
                        viewBox='0 0 512 512'
                     >
                        <title>ionicons-v5-k</title>
                        <path
                           d='M416,221.25V416a48,48,0,0,1-48,48H144a48,48,0,0,1-48-48V96a48,48,0,0,1,48-48h98.75a32,32,0,0,1,22.62,9.37L406.63,198.63A32,32,0,0,1,416,221.25Z'
                           style={{
                              fill: 'none',
                              stroke: '#3880ff',
                              strokeLinejoin: 'round',
                              strokeWidth: '50px',
                           }}
                        />
                        <path
                           d='M256,56V176a32,32,0,0,0,32,32H408'
                           style={{
                              fill: 'none',
                              stroke: '#3880ff',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: '50px',
                           }}
                        />
                        <line
                           x1='176'
                           y1='288'
                           x2='336'
                           y2='288'
                           style={{
                              fill: 'none',
                              stroke: '#3880ff',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: '50px',
                           }}
                        />
                        <line
                           x1='176'
                           y1='368'
                           x2='336'
                           y2='368'
                           style={{
                              fill: 'none',
                              stroke: '#3880ff',
                              strokeLinecap: 'round',
                              strokeLinejoin: 'round',
                              strokeWidth: '50px',
                           }}
                        />
                     </svg>
                     <p>checkr.</p>
                  </div>
                  <div id='loadingCircle'></div>
               </motion.div>
            )}
         </AnimatePresence>
         {tasks && (
            <div id='sidebarContentContainer'>
               <Sidebar
                  tasks={tasks}
                  uniqueLists={uniqueLists}
                  changeContent={changeContent}
                  contentType={contentType}
               />
               <Content
                  contentType={contentType}
                  tasks={tasks}
                  updateUniqueLists={updateUniqueLists}
                  updateTasks={updateTasks}
                  removeTask={removeTask}
                  openTask={openTask}
                  viewTask={viewTask}
               />
            </div>
         )}
      </>
   )
}
/*
function hideScroll() {
   document.querySelector('#contentContainer').style.overflow = 'hidden'
   setTimeout(
      () =>
         (document.querySelector('#contentContainer').style.overflowY = 'auto'),
      500
   )
}
*/
