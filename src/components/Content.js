import React, { useCallback, useState } from 'react'
import Navbar from './Navbar'
import TasksContainer from './Task/TasksContainer'
import { motion } from 'framer-motion'
import TaskView from './Task/TaskView'

export default function Content({
   changeContent,
   contentType,
   dataArr,
   tasks,
   addTask,
   deleteTask,
   uniqueLists,
   updateUniqueLists,
   addUniqueList,
   checkTask,
   removeTask,
   openTask,
   viewTask,
}) {
   //Added task state is updated when new task is made by user
   const [addedTask, setAddedTask] = useState()

   const addDataTask = useCallback((task) => {
      addTask(task)
      setAddedTask(task)
   }, [])

   return (
      <>
         <Navbar
            tasks={tasks}
            addDataTask={addDataTask}
            addedTask={addedTask}
            uniqueLists={uniqueLists}
            addUniqueList={addUniqueList}
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
                  .forEach((taskContainer) =>
                     taskContainer.classList.remove('viewing')
                  )
            }}
         >
            <TasksContainer
               contentType={contentType}
               dataArr={dataArr}
               addedTask={addedTask}
               checkTask={checkTask}
               deleteTask={deleteTask}
               removeTask={removeTask}
               viewTask={viewTask}
               openTask={openTask}
               updateUniqueLists={updateUniqueLists}
            />
         </motion.div>
         <TaskView task={openTask} />
      </>
   )
}
