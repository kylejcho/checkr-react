import React, { useRef, useState } from 'react'
import { useMotionValue, Reorder, AnimatePresence } from 'framer-motion'
import { ReactComponent as Delete } from '../../icons/delete.svg'
import { RaisedShadow } from './RaisedShadow'
import CheckCircle from './CheckCircle'

function Task({ task, tasksCopy, subTasks, updateSubTasks, deleteTask, viewTask }) {
   //Render or remove Task component to trigger AnimatePresence animation
   const [showTask, setShowTask] = useState(true)
   //State to pass to TaskView component
   const [selectTask, setSelectTask] = useState(false)

   const taskContainer = useRef()

   //Update subTasks after the user checks task
   const checkTask = () => {
      let newSubTasks = [...subTasks]
      const checkedSubTask = newSubTasks.find(item => item.id === task.id)
      checkedSubTask.complete = !checkedSubTask.complete
      const subIndex = newSubTasks.indexOf(checkedSubTask)

      if (checkedSubTask.complete) {
         newSubTasks.push(newSubTasks.splice(subIndex, 1)[0])
      } else {
         newSubTasks.unshift(newSubTasks.splice(subIndex, 1)[0])
      }
      updateSubTasks(newSubTasks)
   }

   //Update subTasks after user deletes
   const removeTask = () => {
      updateSubTasks(subTasks.filter(item => item.id !== task.id))

      //Task deletion must be reflected in master 'Tasks' state.
      deleteTask(task)
   }

   //If task is being viewed during delete click, remove taskView
   function handleDeleteClick() {
      setTimeout(() => {
         setShowTask(false)
         if (taskContainer.current.className.includes('viewing')) {
            viewTask(null)
         }
      }, 0)
      setTimeout(() => removeTask(), 250)
   }

   //Motion values to determine when task has stopped moving after dragging
   //BoxShadow remains until animation has finished
   const y = useMotionValue(0)
   const boxShadow = RaisedShadow(y)

   return (
      <AnimatePresence>
         {showTask && (
            <Reorder.Item
               id={task.id}
               ref={taskContainer}
               className={`taskContainer`}
               value={task}
               style={{ boxShadow, y }}
               whileDrag={{ scale: 1.04 }}
               transition={{ duration: 0.25 }}
               onDragStart={() => {
                  taskContainer.current.classList.add('dragging')
               }}
               onDragEnd={() => {
                  taskContainer.current.classList.remove('dragging')
               }}
               exit={{ opacity: 0, transition: { duration: 0.3 } }}
               dragTransition={{ bounceStiffness: 1000, bounceDamping: 70 }}
               onClick={e => {
                  e.stopPropagation()
                  viewTask(task)
                  setSelectTask(!selectTask)
                  document
                     .querySelectorAll('.taskContainer')
                     .forEach(taskContainer => taskContainer.classList.remove('viewing'))
                  taskContainer.current.classList.add('viewing')
               }}
            >
               <CheckCircle
                  task={task}
                  taskContainer={taskContainer}
                  checkTask={checkTask}
               />
               <div className='nameContainer'>{task.name}</div>
               <div
                  className='deleteContainer'
                  onClick={e => {
                     handleDeleteClick()
                     e.stopPropagation()
                  }}
               >
                  <Delete />
               </div>
               <div className='descriptionContainer'>{task.description}</div>
            </Reorder.Item>
         )}
      </AnimatePresence>
   )
}

export default React.memo(Task)
