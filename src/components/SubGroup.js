import React, { useEffect, useRef, useState } from 'react'
import Task from './Task/Task'
import { Reorder } from 'framer-motion'
import { addDays, endOfDay, isBefore } from 'date-fns'

function SubGroup({
   updateSubTasks,
   updateTasks,
   tasksCopy,
   contentType,
   removeTask,
   deleteTask,
   subTasks,
   viewTask,
}) {
   const [tasks, setTasks] = useState(null)

   const firstRender = useRef(true)
   useEffect(() => {
      setTimeout(() => {
         if (firstRender.current) {
            firstRender.current = false
         }
      }, 450)
   })

   useEffect(() => {
      if (contentType === 'week') {
         setTasks(
            subTasks.filter(task => {
               return isBefore(task.dueDate, addDays(endOfDay(new Date()), 7))
            })
         )
      } else if (
         contentType !== 'all' &&
         contentType !== 'today' &&
         contentType !== 'home'
      ) {
         setTasks(subTasks.filter(task => task.list === contentType))
      }
   }, [contentType, subTasks])

   const group = task => {
      return (
         <Task
            key={task.id}
            task={task}
            tasksCopy={tasksCopy}
            subTasks={subTasks}
            viewTask={viewTask}
            removeTask={removeTask}
            deleteTask={deleteTask}
            updateTasks={updateTasks}
            updateSubTasks={updateSubTasks}
         />
      )
   }

   return (
      <div className='subGroup' id={contentType}>
         <Reorder.Group values={subTasks} onReorder={updateSubTasks}>
            {tasks ? tasks.map(task => group(task)) : subTasks.map(task => group(task))}
         </Reorder.Group>
      </div>
   )
}
export default React.memo(SubGroup)
