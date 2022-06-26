import React, { useCallback, useState } from 'react'
import Navbar from './Navbar'
import TasksContainer from './Task/TasksContainer'
import { motion } from 'framer-motion'
import TaskView from './Task/TaskView'

export default function Content({
   changeContent,
   contentType,
   updateTasks,
   tasks,
   addTask,
   deleteTask,
   taskOpened,
   viewTask,
}) {
   //Added task state is updated when new task is made by user
   const [addedTask, setAddedTask] = useState()

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
               updateTasks={updateTasks}
               deleteTask={deleteTask}
               viewTask={viewTask}
               taskOpened={taskOpened}
            />
         </motion.div>
         <TaskView task={taskOpened} />
      </>
   )
}
