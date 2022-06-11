import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TasksContainer from './Task/TasksContainer'
import { motion } from 'framer-motion'
import TaskView from './Task/TaskView'

export default function Content({
   contentType,
   tasks,
   checkTask,
   updateTasks,
   removeTask,
   openTask,
   viewTask,
   uniqueLists,
}) {
   //Added task state is updated when new task is made by user
   const [addedTask, setAddedTask] = useState()
   const addTask = (task) => setAddedTask(task)

   return (
      <>
         <Navbar tasks={tasks} addTask={addTask} uniqueLists={uniqueLists} />
         <motion.div
            layoutScroll
            id='contentContainer'
            onClick={() => {
               viewTask(null)
               document
                  .querySelectorAll('.taskContainer')
                  .forEach((taskContainer) =>
                     taskContainer.classList.remove('viewing')
                  )
            }}
         >
            <TasksContainer
               contentType={contentType}
               tasks={tasks}
               addedTask={addedTask}
               checkTask={checkTask}
               updateTasks={updateTasks}
               removeTask={removeTask}
               viewTask={viewTask}
               openTask={openTask}
            />
         </motion.div>
         <TaskView task={openTask} />
      </>
   )
}
