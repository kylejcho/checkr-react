import React, { useEffect, useState, useCallback } from 'react'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Content from './Content'
import Sidebar from './Sidebar'

export default function SidebarContentContainer() {
   //Master list of users tasks and is updated whenever an update needs to be sent to FireStore database
   const [tasks, setTasks] = useState(null)

   //Determines whether a task is open in taskView mode within the content container
   const [taskOpened, setTaskOpened] = useState(null)

   //State is set to current content path
   const [contentType, setContentType] = useState('home')

   const viewTask = useCallback(task => {
      setTaskOpened(task)
   }, [])

   const addTask = task => {
      setTasks(prevTasks => [task, ...prevTasks])
   }

   const deleteTask = useCallback(
      task => {
         setTasks(tasks.filter(prevTask => prevTask.id !== task.id))
      },
      [tasks]
   )

   const updateTasks = useCallback(
      subTasks => {
         const prevTasks = [...tasks]
         const t = prevTasks.filter(task => !subTasks.includes(task))
         setTasks([...t, ...subTasks])
      },
      [tasks]
   )

   //taskOpened state set to null to remove taskViewContainer during content change
   const changeContent = useCallback(type => {
      setContentType(type)
      setTaskOpened(null)
   }, [])

   //On first mount, user's data collection is requested from Firebase
   const data = async () => {
      const querySnapshot = await getDocs(collection(db, `${auth.currentUser.uid}`))

      //User's data pushed into a new array of objects
      const arr = []
      querySnapshot.forEach(doc => {
         doc.data().tasks.forEach(task => {
            const a = {
               name: task.name,
               description: task.description,
               dueDate: task.dueDate.toDate(),
               list: task.list,
               complete: task.complete,
               id: task.id,
            }
            arr.push(a)
         })
      })
      //'Tasks' state is set to be the new array of tasks.
      setTasks([...arr])
   }

   //Only get data from firebase once user authentification state has changed
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
         if (currentUser) setTimeout(() => data(), 200)
      })
      return unsubscribe()
   }, [])

   const writeUserData = () => {
      setDoc(doc(db, `${auth.currentUser.uid}`, 'tasks'), {
         tasks: [...tasks],
      })
   }

   useEffect(() => {
      if (tasks) writeUserData()
   }, [tasks])

   //Render LoadingScreen until user is logged in and tasks state is set
   return (
      <>
         <AnimatePresence>{!tasks && <LoadingScreen />}</AnimatePresence>
         {tasks && (
            <div id='sidebarContentContainer'>
               <Sidebar
                  tasks={tasks}
                  changeContent={changeContent}
                  contentType={contentType}
               />
               <Content
                  changeContent={changeContent}
                  contentType={contentType}
                  updateTasks={updateTasks}
                  tasks={tasks}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  taskOpened={taskOpened}
                  viewTask={viewTask}
               />
            </div>
         )}
      </>
   )
}
