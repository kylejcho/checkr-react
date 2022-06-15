import React, { useEffect, useRef, useState } from 'react'
import Task from './Task/Task'
import { Reorder } from 'framer-motion'

function SubGroup({
   subTasks,
   updateSubTasks,
   contentType,
   type,
   updateTasks,
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
      if (
         contentType !== 'all' &&
         contentType !== 'today' &&
         contentType !== 'week' &&
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
                          task={task.list === contentType && task}
                          subTasks={subTasks}
                          updateSubTasks={updateSubTasks}
                          viewTask={viewTask}
                          removeTask={removeTask}
                          updateTasks={updateTasks}
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
                          updateTasks={updateTasks}
                       />
                    )
                 })}
         </Reorder.Group>
      </div>
   )
}
export default React.memo(SubGroup)
