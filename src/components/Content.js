import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import TasksContainer from './Task/TasksContainer'
import TaskView from './Task/TaskView'
import Navbar from './Navbar'

export default function Content({
   changeContent,
   contentType,
   tasks,
   deleteTask,
   addTask,
   taskOpened,
   viewTask,
}) {
   //Added task state is updated when new task is made by user
   const [addedTask, setAddedTask] = useState()

   //Set Sidebar/Nav tasks state + SubGroup tasks state
   const addDataTask = useCallback(
      task => {
         addTask(task)
         setAddedTask(task)
      },
      [addTask]
   )

   return (
      <>
         <Navbar
            tasks={tasks}
            addDataTask={addDataTask}
            addedTask={addedTask}
            changeContent={changeContent}
            contentType={contentType}
            viewTask={viewTask}
         />
         <motion.div
            layoutScroll
            id='contentContainer'
            onClick={() => {
               viewTask(null)
               document
                  .querySelectorAll('.taskContainer')
                  .forEach(taskContainer => taskContainer.classList.remove('viewing'))
            }}
         >
            <TasksContainer
               contentType={contentType}
               tasksCopy={[...tasks]}
               addedTask={addedTask}
               deleteTask={deleteTask}
               viewTask={viewTask}
               taskOpened={taskOpened}
            />
         </motion.div>
         <TaskView task={taskOpened} />
      </>
   )
}
