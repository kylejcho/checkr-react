import React, { useEffect, useRef, useState } from 'react'
import Task from './Task/Task'
import { Reorder } from 'framer-motion'
import { addDays, endOfDay, isBefore } from 'date-fns'

function SubGroup({
   subTasks,
   updateSubTasks,
   contentType,
   type,
   removeTask,
   viewTask,
}) {
   const firstRender = useRef(true)
   useEffect(() => {
      setTimeout(() => {
         if (firstRender.current) {
            firstRender.current = false
            return
         }
      }, 450)
   })

   const [tasks, setTasks] = useState(null)

   useEffect(() => {
      if (contentType === 'week') {
         setTasks(
            subTasks.filter((task) => {
               return isBefore(task.dueDate, addDays(endOfDay(new Date()), 7))
            })
         )
      } else if (
         contentType !== 'all' &&
         contentType !== 'today' &&
         contentType !== 'home'
      ) {
         setTasks(subTasks.filter((task) => task.list === contentType))
      }
   }, [contentType, subTasks])

   return (
      <div className='subGroup' id={type}>
         <Reorder.Group values={subTasks} onReorder={updateSubTasks}>
            {tasks
               ? tasks.map((task) => {
                    return (
                       <Task
                          key={task.id}
                          task={task}
                          subTasks={subTasks}
                          updateSubTasks={updateSubTasks}
                          viewTask={viewTask}
                          removeTask={removeTask}
                       />
                    )
                 })
               : subTasks.map((task) => {
                    return (
                       <Task
                          key={task.id}
                          task={task}
                          subTasks={subTasks}
                          updateSubTasks={updateSubTasks}
                          viewTask={viewTask}
                          removeTask={removeTask}
                       />
                    )
                 })}
         </Reorder.Group>
      </div>
   )
}
export default React.memo(SubGroup)
