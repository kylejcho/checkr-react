import React, { useEffect, useState } from 'react'
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
   const [altTasks, setAltTasks] = useState(null)

   //On first render, filter subTasks based on ContentType state.
   //Otherwise map through subtasks
   useEffect(() => {
      //If "week" contentType, filter subtasks with due-dates that are within a week
      if (contentType === 'week') {
         setAltTasks(
            subTasks.filter(task => {
               return isBefore(task.dueDate, addDays(endOfDay(new Date()), 7))
            })
         )
      }
      //If 'list' content type, filter subtasks for tasks with lists that match the given list name
      else if (
         contentType !== 'all' &&
         contentType !== 'today' &&
         contentType !== 'home'
      ) {
         setAltTasks(subTasks.filter(task => task.list === contentType))
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

   //Render from either altTasks or subTasks
   return (
      <div className='subGroup' id={contentType}>
         <Reorder.Group values={subTasks} onReorder={updateSubTasks}>
            {altTasks
               ? altTasks.map(task => group(task))
               : subTasks.map(task => group(task))}
         </Reorder.Group>
      </div>
   )
}

export default React.memo(SubGroup)
