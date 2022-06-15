import React, { useState } from 'react'
import Navbar from './Navbar'
import TasksContainer from './Task/TasksContainer'
import { motion } from 'framer-motion'
import TaskView from './Task/TaskView'

export default function Content({
   contentType,
   tasks,
   uniqueLists,
   updateUniqueLists,
   addUniqueList,
   checkTask,
   updateTasks,
   removeTask,
   openTask,
   viewTask,
}) {
   //Added task state is updated when new task is made by user
   const [addedTask, setAddedTask] = useState()

   function addTask(task) {
      addUniqueList(task)
      setAddedTask(task)
   }

   return (
      <>
         <Navbar
            tasks={tasks}
            addTask={addTask}
            uniqueLists={uniqueLists}
            addUniqueList={addUniqueList}
         />
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
