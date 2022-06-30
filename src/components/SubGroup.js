import React, { useEffect, useRef, useState } from 'react'
import { addDays, endOfDay, isBefore } from 'date-fns'
import { Reorder } from 'framer-motion'
import Task from './Task/Task'

function SubGroup({
   updateSubTasks,
   tasksCopy,
   contentType,
   removeTask,
   subTasks,
   viewTask,
}) {
   const [tasks, setTasks] = useState(null)

   //On first render, filter out all subTasks based on ContentType stae
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

   function group(task) {
      return (
         <Task
            key={task.id}
            task={task}
            tasksCopy={tasksCopy}
            subTasks={subTasks}
            viewTask={viewTask}
            removeTask={removeTask}
            updateSubTasks={updateSubTasks}
         />
      )
   }

   //Render from either tasks or subTasks
   return (
      <div className='subGroup' id={contentType}>
         <Reorder.Group values={subTasks} onReorder={updateSubTasks}>
            {tasks ? tasks.map(task => group(task)) : subTasks.map(task => group(task))}
         </Reorder.Group>
      </div>
   )
}

export default React.memo(SubGroup)
