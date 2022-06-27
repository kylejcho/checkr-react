import React, { useEffect, useState, useCallback } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Content from './Content'
import Sidebar from './Sidebar'

export default function SidebarContentContainer() {
   //Master list of users tasks
   const [tasks, setTasks] = useState(null)

   //Open or close task view
   const [taskOpened, setTaskOpened] = useState(null)

   const [contentType, setContentType] = useState('home')

   const viewTask = useCallback(task => {
      setTaskOpened(task)
   }, [])

   const addTask = useCallback(
      task => {
         setTasks(prevTasks => [task, ...prevTasks])
      },
      [setTasks]
   )

   //taskOpened state set to null to remove taskViewContainer during content change
   const changeContent = useCallback(type => {
      setContentType(type)
      setTaskOpened(null)
   }, [])

   //On first mount, get user data once
   useEffect(() => {
      const getUserData = async () => {
         const data = await getData()
         setTasks(data)
      }
      getUserData()
   }, [])

   //Loading screen until user is signed in and tasks is set
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
                  tasks={tasks}
                  addTask={addTask}
                  taskOpened={taskOpened}
                  viewTask={viewTask}
               />
            </div>
         )}
      </>
   )
}

//User's data collection is requested from Firebase
const getData = async () => {
   //Get user's document from database
   const docRef = await getDoc(doc(db, `${auth.currentUser.uid}`, 'tasks'))

   //User's data pushed into a new array of objects
   const userData = []
   docRef.data()?.tasks.forEach(task => {
      const t = {
         name: task.name,
         description: task.description,
         dueDate: task.dueDate.toDate(),
         list: task.list,
         complete: task.complete,
         id: task.id,
      }
      userData.push(t)
   })
   return userData
}
